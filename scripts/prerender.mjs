/**
 * 빌드 타임 프리렌더 (AEO/GEO)
 * ---------------------------------------------------------------------------
 * 목동임페리얼학원 홈페이지의 본문은 src/main.js 의 IMPERIAL_DATA 에서 나옵니다.
 * 브라우저는 이 데이터를 자바스크립트로 그려주지만, AI 답변엔진의 크롤러
 * (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, 네이버 Yeti 등)는
 * 자바스크립트를 실행하지 않기 때문에 원본 HTML만 읽습니다.
 *
 * 이 스크립트는 브라우저가 쓰는 것과 "완전히 동일한" 빌더 함수로 HTML을 만들어
 * index.html 안의 <!--PR:키--> ... <!--/PR:키--> 구간에 미리 심어 둡니다.
 * 사람과 봇이 똑같은 파일을 받으므로 클로킹(cloaking)이 아닙니다.
 *
 * 함께 생성하는 파일: robots.txt, sitemap.xml, rss.xml, llms.txt
 *
 * 실행: npm run build  (내부적으로 npm run prerender && npm run css)
 */

import { createRequire } from 'node:module';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const M = require('../src/main.js');
const SITE = require('../src/site.config.js');
const DB = M.IMPERIAL_DATA;

const BASE = SITE.url.replace(/\/$/, '');
const abs = (path) => BASE + path;

/* ─── 유틸 ───────────────────────────────────────────────────────────────── */

const stripTags = (s) => String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const xmlEscape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** PNG/JPEG 파일에서 실제 픽셀 크기를 읽습니다. (og:image:width 등에 정확한 값을 넣기 위함) */
function imageSize(file) {
    const b = readFileSync(file);
    if (b[0] === 0x89 && b[1] === 0x50) {                 // PNG
        return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    }
    if (b[0] === 0xff && b[1] === 0xd8) {                 // JPEG
        let i = 2;
        while (i < b.length - 9) {
            if (b[i] !== 0xff) { i++; continue; }
            const marker = b[i + 1];
            if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
                return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
            }
            i += 2 + b.readUInt16BE(i + 2);
        }
    }
    return null;
}

/** 설정된 이미지 경로가 실제로 존재할 때만 { url, width, height } 를 돌려줍니다. */
function asset(path) {
    if (!path) return null;
    const file = join(ROOT, path.replace(/^\//, ''));
    if (!existsSync(file)) return null;
    let size = null;
    try { size = imageSize(file); } catch (e) { /* 크기를 못 읽어도 링크는 유효 */ }
    return { url: abs(path), ...(size || {}) };
}

/** 데이터 그룹별 최종 수정일 중 가장 최근 날짜 (sitemap lastmod / dateModified 용) */
function latestUpdate() {
    const dates = Object.values(DB.lastUpdated || {}).filter(Boolean).sort();
    return dates.length ? dates[dates.length - 1] : null;
}

/** '2026-08-23' -> '<time datetime="2026-08-23">2026년 8월 23일</time>' 형태의 갱신일 표기 */
function updatedTag(iso) {
    if (!iso) return '';
    const [y, mo, d] = iso.split('-');
    return `최종 업데이트: <time datetime="${iso}">${y}년 ${+mo}월 ${+d}일</time>`;
}

/** '400,000' -> '400000' (schema.org price 는 구분자 없는 숫자여야 함) */
const plainPrice = (s) => String(s).replace(/[^\d]/g, '');

/** '고등 수학' -> 'high-math' */
function courseSlug(title) {
    return title
        .replace(/중등/, 'mid').replace(/고등/, 'high')
        .replace(/수학/, 'math').replace(/영어/, 'english')
        .replace(/국어/, 'korean').replace(/과학/, 'science')
        .trim().replace(/\s+/g, '-');
}

/* ─── 1. index.html 본문 프리렌더 ────────────────────────────────────────── */

function injectHTML(html, key, content) {
    const re = new RegExp(`<!--PR:${key}-->[\\s\\S]*?<!--/PR:${key}-->`);
    if (!re.test(html)) throw new Error(`index.html 에 <!--PR:${key}--> 마커가 없습니다.`);
    return html.replace(re, `<!--PR:${key}-->${content}<!--/PR:${key}-->`);
}

/* ─── 2. JSON-LD @graph ──────────────────────────────────────────────────── */

function buildJsonLd() {
    const id = (frag) => `${BASE}/#${frag}`;
    const graph = [];
    const modified = latestUpdate();

    graph.push({
        '@type': 'WebSite',
        '@id': id('website'),
        url: BASE + '/',
        name: SITE.name,
        inLanguage: 'ko-KR',
        publisher: { '@id': id('academy') }
    });

    graph.push({
        '@type': 'WebPage',
        '@id': id('webpage'),
        url: BASE + '/',
        name: SITE.title,
        description: SITE.description,
        isPartOf: { '@id': id('website') },
        about: { '@id': id('academy') },
        inLanguage: 'ko-KR',
        ...(modified ? { dateModified: modified } : {})
    });

    // ── 중심 노드: 학원 엔티티 ──
    const instructors = DB.teachers.filter(t => t.subject !== 'TA');

    const academy = {
        '@type': ['EducationalOrganization', 'LocalBusiness'],
        '@id': id('academy'),
        name: SITE.name,
        alternateName: SITE.alternateName,
        legalName: SITE.legalName,
        description: SITE.description,
        url: BASE + '/',
        telephone: SITE.telephoneE164,
        address: { '@type': 'PostalAddress', ...SITE.address },
        hasMap: SITE.naverMap,
        openingHoursSpecification: SITE.openingHours.map(h => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes
        })),
        priceRange: '₩170,000-₩400,000/월',
        currenciesAccepted: 'KRW',
        knowsLanguage: 'ko',
        taxID: SITE.taxID,
        identifier: [
            { '@type': 'PropertyValue', propertyID: '사업자등록번호', value: SITE.taxID },
            { '@type': 'PropertyValue', propertyID: '학원설립·운영등록번호', value: SITE.academyLicense }
        ],
        areaServed: [
            { '@type': 'AdministrativeArea', name: '서울특별시 양천구' },
            { '@type': 'Place', name: '목동' },
            { '@type': 'Place', name: '등촌역' },
            ...SITE.highSchools.map(n => ({ '@type': 'HighSchool', name: n })),
            ...SITE.middleSchools.map(n => ({ '@type': 'MiddleSchool', name: n }))
        ],
        knowsAbout: SITE.knowsAbout,
        sameAs: SITE.sameAs,
        hasOfferCatalog: { '@id': id('catalog') },
        mainEntityOfPage: { '@id': id('webpage') },
        employee: instructors.map(t => ({ '@id': id('person-' + t.id) }))
    };

    const founder = instructors.find(t => t.name === SITE.founderName);
    if (founder) academy.founder = { '@id': id('person-' + founder.id) };
    if (SITE.geo) academy.geo = { '@type': 'GeoCoordinates', latitude: SITE.geo.latitude, longitude: SITE.geo.longitude };
    const logo = asset(SITE.logo);
    const ogImg = asset(SITE.ogImage) || logo;
    if (logo) academy.logo = { '@type': 'ImageObject', url: logo.url, ...(logo.width ? { width: logo.width, height: logo.height } : {}) };
    if (ogImg) academy.image = ogImg.url;

    graph.push(academy);

    // ── 교습 과정 (대표 6개) ──
    graph.push({
        '@type': 'OfferCatalog',
        '@id': id('catalog'),
        name: '목동임페리얼학원 교습 과정',
        itemListElement: DB.tuition.summary.map(item => ({
            '@type': 'Offer',
            '@id': id('offer-' + courseSlug(item.title)),
            itemOffered: { '@id': id('course-' + courseSlug(item.title)) },
            category: 'Paid',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: plainPrice(item.price),
                priceCurrency: 'KRW',
                unitCode: 'MON',
                unitText: '월',
                valueAddedTaxIncluded: true
            }
        }))
    });

    for (const item of DB.tuition.summary) {
        const level = item.title.startsWith('중등') ? '중학교' : '고등학교';
        const subject = item.title.split(' ')[1];
        graph.push({
            '@type': 'Course',
            '@id': id('course-' + courseSlug(item.title)),
            name: `${SITE.name} ${item.title}`,
            description: `${SITE.name}의 ${item.title} 정규 강좌입니다. ${level} 과정 ${subject} 내신 및 수능 대비를 진행하며 월 교습비는 ${item.price}원입니다.`,
            provider: { '@id': id('academy') },
            educationalLevel: level,
            teaches: subject,
            inLanguage: 'ko'
        });
    }

    // ── 강사 (조교 제외) ──
    for (const t of instructors) {
        const person = {
            '@type': 'Person',
            '@id': id('person-' + t.id),
            name: t.name,
            jobTitle: t.role,
            worksFor: { '@id': id('academy') },
            knowsAbout: [t.subject]
        };
        if (t.alumniOf) person.alumniOf = { '@type': 'CollegeOrUniversity', name: t.alumniOf };
        graph.push(person);
    }

    // ── FAQ ──
    graph.push({
        '@type': 'FAQPage',
        '@id': id('faq'),
        inLanguage: 'ko-KR',
        mainEntity: DB.faq.flatMap(g => g.items.map(item => ({
            '@type': 'Question',
            name: stripTags(item.q),
            acceptedAnswer: { '@type': 'Answer', text: stripTags(item.a) }
        })))
    });

    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1);
}

/* ─── 3. <head> 메타 ─────────────────────────────────────────────────────── */

function buildHead() {
    const L = [];
    L.push(`<title>${SITE.title}</title>`);
    L.push(`<meta name="description" content="${SITE.description}">`);
    L.push(`<link rel="canonical" href="${BASE}/">`);
    L.push(`<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`);
    L.push(`<meta name="author" content="${SITE.legalName}">`);
    L.push('');
    L.push(`<meta property="og:type" content="website">`);
    L.push(`<meta property="og:site_name" content="${SITE.name}">`);
    L.push(`<meta property="og:locale" content="ko_KR">`);
    L.push(`<meta property="og:title" content="${SITE.ogTitle}">`);
    L.push(`<meta property="og:description" content="${SITE.ogDescription}">`);
    L.push(`<meta property="og:url" content="${BASE}/">`);
    const ogImg = asset(SITE.ogImage) || asset(SITE.logo);
    if (ogImg) {
        L.push(`<meta property="og:image" content="${ogImg.url}">`);
        if (ogImg.width) {
            L.push(`<meta property="og:image:width" content="${ogImg.width}">`);
            L.push(`<meta property="og:image:height" content="${ogImg.height}">`);
        }
        L.push(`<meta property="og:image:alt" content="${SITE.name} - ${SITE.addressFull}">`);
    }
    L.push('');
    L.push(`<meta name="twitter:card" content="${ogImg ? 'summary_large_image' : 'summary'}">`);
    L.push(`<meta name="twitter:title" content="${SITE.ogTitle}">`);
    L.push(`<meta name="twitter:description" content="${SITE.ogDescription}">`);
    if (ogImg) L.push(`<meta name="twitter:image" content="${ogImg.url}">`);
    L.push('');
    L.push(`<meta name="geo.region" content="KR-11">`);
    L.push(`<meta name="geo.placename" content="${SITE.address.addressRegion} ${SITE.address.addressLocality}">`);
    if (SITE.geo) {
        L.push(`<meta name="geo.position" content="${SITE.geo.latitude};${SITE.geo.longitude}">`);
        L.push(`<meta name="ICBM" content="${SITE.geo.latitude}, ${SITE.geo.longitude}">`);
    }
    if (asset(SITE.favicon)) L.push(`<link rel="icon" href="${SITE.favicon}" sizes="any">`);
    if (asset(SITE.appleTouchIcon)) L.push(`<link rel="apple-touch-icon" href="${SITE.appleTouchIcon}">`);
    if (SITE.naverSiteVerification) L.push(`<meta name="naver-site-verification" content="${SITE.naverSiteVerification}">`);
    if (SITE.googleSiteVerification) L.push(`<meta name="google-site-verification" content="${SITE.googleSiteVerification}">`);
    L.push('');
    L.push(`<script type="application/ld+json">${buildJsonLd()}</script>`);

    return '\n    ' + L.join('\n    ') + '\n    ';
}

/* ─── 4. 루트 파일 생성 ──────────────────────────────────────────────────── */

function robotsTxt() {
    // robots.txt 에는 "AI 봇 전체"를 한 번에 지정하는 와일드카드가 없으므로 하나씩 명시합니다.
    const groups = [
        ['검색 엔진', ['Googlebot', 'bingbot', 'Yeti', 'Daum', 'Applebot']],
        ['AI 검색(답변 생성 시 실시간 조회)', ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'DuckAssistBot']],
        ['사용자 요청 기반 조회', ['ChatGPT-User', 'Claude-User', 'Perplexity-User', 'MistralAI-User']],
        ['학습·수집', ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Amazonbot', 'meta-externalagent']]
    ];

    let out = `# ${SITE.name} — 검색 및 AI 답변엔진 접근 허용\n\nUser-agent: *\nAllow: /\nDisallow: /node_modules/\n`;
    for (const [label, bots] of groups) {
        out += `\n# ${label}\n`;
        for (const b of bots) out += `User-agent: ${b}\nAllow: /\n`;
    }
    out += `\nSitemap: ${BASE}/sitemap.xml\n`;
    return out;
}

function sitemapXml() {
    const mod = latestUpdate();
    // changefreq / priority 는 검색엔진이 무시하므로 넣지 않습니다.
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE}/</loc>${mod ? `\n    <lastmod>${mod}</lastmod>` : ''}
  </url>
</urlset>
`;
}

function rssXml() {
    // 네이버 서치어드바이저가 수집할 수 있도록 FAQ를 RSS 2.0 피드로 제공합니다.
    let i = 0;
    const items = DB.faq.flatMap(g => g.items.map(item => {
        const n = i++;
        return `    <item>
      <title>${xmlEscape(stripTags(item.q))}</title>
      <link>${BASE}/#faq-answer-${n}</link>
      <description>${xmlEscape(stripTags(item.a))}</description>
      <guid isPermaLink="false">faq-${n}</guid>
    </item>`;
    })).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(SITE.name)}</title>
    <link>${BASE}/</link>
    <description>${xmlEscape(SITE.description)}</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;
}

function llmsTxt() {
    const fees = DB.tuition.summary.map(t => `- ${t.title}: 월 ${t.price}원`).join('\n');
    const schools = [...SITE.highSchools, ...SITE.middleSchools].join(', ');

    return `# ${SITE.name}

> ${SITE.addressFull}에 위치한 중1~고3 대상 수학·영어·국어·과학 학원입니다. ${schools} 재학생의 내신 및 수능 대비를 전문으로 합니다. ${SITE.subwayLine} ${SITE.subwayStation} ${SITE.subwayExit}에서 ${SITE.subwayDistanceM}m, 도보 약 ${SITE.subwayWalkMin}분 거리입니다. 전화 ${SITE.telephone}. 운영시간 ${SITE.openingHoursText}.

법인명 ${SITE.legalName} · 대표 ${SITE.founderName} · 사업자등록번호 ${SITE.taxID} · 학원 신고번호 ${SITE.academyLicense}

## 교습비 (월 기준)

${fees}

특강료는 별도로 산정되며, 교재비는 교습비에 포함되지 않습니다. 전체 교습비 등 게시표는 홈페이지 교습비 안내에서 확인할 수 있습니다.

## 주요 정보

- [강사진](${BASE}/#teachers)
- [시간표](${BASE}/#timetable)
- [교습비](${BASE}/#tuition)
- [자주 묻는 질문](${BASE}/#faq)

## 채널

- [네이버 지도](${SITE.naverMap})
- [네이버 블로그](https://blog.naver.com/imperialsys01)
- [인스타그램](https://www.instagram.com/imperialsys01/)
- [카카오톡 채널](https://pf.kakao.com/_xlwGsG)
`;
}

/* ─── 실행 ───────────────────────────────────────────────────────────────── */

const indexPath = join(ROOT, 'index.html');
let html = readFileSync(indexPath, 'utf8');

const sections = {
    'head': buildHead(),
    'success-math': M.buildSuccessStoriesHTML(DB.successStories.math),
    'success-english': M.buildSuccessStoriesHTML(DB.successStories.english),
    'success-korean': M.buildSuccessStoriesHTML(DB.successStories.korean),
    'success-science': M.buildSuccessStoriesHTML(DB.successStories.science),
    'teachers': M.buildTeacherCardsHTML(DB.teachers),
    'teacher-options': M.buildTeacherOptionsHTML(DB.teachers),
    'timetable': M.buildTimetableRowsHTML(DB.classes, DB.teachers),
    'timetable-mobile': M.buildTimetableCardsHTML(DB.classes, DB.teachers),
    'tuition': M.buildTuitionCardsHTML(DB.tuition.summary),
    'tuition-policy': DB.tuition.policy,
    'updated-classes': updatedTag(DB.lastUpdated && DB.lastUpdated.classes),
    'updated-tuition': updatedTag(DB.lastUpdated && DB.lastUpdated.tuition),
    'legal-tuition': M.buildLegalTuitionRowsHTML(DB.tuition.legalList),
    'faq': M.buildFAQHTML(DB.faq)
};

for (const [key, content] of Object.entries(sections)) {
    html = injectHTML(html, key, content);
}

writeFileSync(indexPath, html, 'utf8');
writeFileSync(join(ROOT, 'robots.txt'), robotsTxt(), 'utf8');
writeFileSync(join(ROOT, 'sitemap.xml'), sitemapXml(), 'utf8');
writeFileSync(join(ROOT, 'rss.xml'), rssXml(), 'utf8');
writeFileSync(join(ROOT, 'llms.txt'), llmsTxt(), 'utf8');

const faqCount = DB.faq.reduce((n, g) => n + g.items.length, 0);
console.log('[prerender] index.html 갱신 완료');
console.log(`            FAQ ${faqCount}개 · 강사 ${DB.teachers.length}명 · 강좌 ${DB.classes.length}개 · 교습비 게시표 ${DB.tuition.legalList.length}행`);
console.log(`            JSON-LD 노드 ${JSON.parse(buildJsonLd())['@graph'].length}개 · 기준 도메인 ${BASE}`);
const _logo = asset(SITE.logo), _og = asset(SITE.ogImage) || _logo;
console.log(`            로고 ${_logo ? _logo.url + ' (' + _logo.width + 'x' + _logo.height + ')' : '없음 — assets/ 에 파일을 넣으면 자동 반영'} · og:image ${_og ? 'OK' : '없음'}`);
console.log('[prerender] robots.txt / sitemap.xml / rss.xml / llms.txt 생성 완료');
