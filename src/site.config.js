// 사이트 전역 설정 — 이 파일 하나만 고치면 canonical/og/JSON-LD/sitemap/robots/llms.txt가 모두 따라갑니다.
// scripts/prerender.mjs 가 빌드할 때 읽어갑니다.

const SITE = {
    // ── 도메인 ──────────────────────────────────────────────────────────────
    // 커스텀 도메인(예: https://www.imperialwith.com)을 연결하면 이 값만 바꾸세요.
    // 끝에 슬래시(/)를 넣지 마세요.
    url: 'https://imperial-homepage.pages.dev',

    // ── 기본 정보 ───────────────────────────────────────────────────────────
    name: '목동임페리얼학원',
    alternateName: ['임페리얼학원', '임페리얼위드', 'Mokdong Imperial Academy'],
    legalName: '임페리얼위드 주식회사',
    founderName: '김기중',
    taxID: '822-81-03309',        // 사업자등록번호
    academyLicense: '제6463호',    // 학원 설립·운영 등록(신고) 번호
    telephone: '02-2644-1178',
    telephoneE164: '+82-2-2644-1178',

    title: '목동임페리얼학원 | 서울 양천구 등촌로 중·고등 수학·영어·국어·과학 학원',
    description: '서울 양천구 등촌로 192 4층에 위치한 중1~고3 수학·영어·국어·과학 학원입니다. 영일고·경복여고·대일고 등 인근 학교의 내신과 수능을 대비합니다. 02-2644-1178',
    ogTitle: '목동임페리얼학원 | 양천구 등촌로 중·고등 종합학원',
    ogDescription: '영일고·경복여고·대일고 등 인근 학교 내신 및 수능 대비. 서울 양천구 등촌로 192 4층 · 02-2644-1178',

    // ── 주소 ────────────────────────────────────────────────────────────────
    address: {
        streetAddress: '등촌로 192, 4층',
        addressLocality: '양천구',
        addressRegion: '서울특별시',
        postalCode: '07950',
        addressCountry: 'KR'
    },
    addressFull: '서울특별시 양천구 등촌로 192, 4층',
    jibunAddress: '서울특별시 양천구 목동 621-13',

    // 도로명주소 '서울특별시 양천구 등촌로 192' 지오코딩 결과 (우편번호 07950, 목3동)
    geo: { latitude: 37.546802, longitude: 126.863181 },

    // ── 운영 시간 ───────────────────────────────────────────────────────────
    openingHours: [
        { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:00', closes: '22:00' },
        { days: ['Saturday', 'Sunday'], opens: '10:00', closes: '22:00' }
    ],
    openingHoursText: '평일 14:00 - 22:00 / 주말 10:00 - 22:00',

    // ── 교통 ────────────────────────────────────────────────────────────────
    subwayLine: '서울 지하철 9호선',
    subwayStation: '등촌역',
    subwayExit: '6번 출구',
    subwayDistanceM: 445,
    subwayWalkMin: 6,

    // ── 외부 채널 (엔티티 결합용 sameAs) ────────────────────────────────────
    naverMap: 'https://map.naver.com/p/entry/place/1005957201',
    sameAs: [
        'https://map.naver.com/p/entry/place/1005957201',
        'https://blog.naver.com/imperialsys01',
        'https://www.instagram.com/imperialsys01/',
        'https://pf.kakao.com/_xlwGsG'
        // 구글 비즈니스 프로필을 만들면 그 URL을 여기에 추가하세요.
    ],

    // ── 이미지 ──────────────────────────────────────────────────────────────
    // 아래 경로에 파일이 "실제로 존재할 때만" og:image / JSON-LD logo 가 생성됩니다.
    // (파일이 없으면 자동으로 건너뛰므로 깨진 이미지 링크가 나가지 않습니다.)
    // 크기는 빌드 시 파일에서 직접 읽으므로 따로 적을 필요가 없습니다.
    logo: '/assets/logo.jpg',
    ogImage: '/assets/og.jpg',            // 없으면 logo 를 og:image 로 사용
    favicon: '/assets/favicon.ico',
    appleTouchIcon: '/assets/apple-touch-icon.png',

    // ── 검색엔진 소유확인 토큰 (등록 후 값만 채우면 메타태그가 생성됩니다) ──
    naverSiteVerification: null,
    googleSiteVerification: null,

    // ── 재원생 출신 학교 ────────────────────────────────────────────────────
    highSchools: ['영일고등학교', '경복여자고등학교', '대일고등학교', '마포고등학교', '명덕여자고등학교',
                  '세현고등학교', '광영여자고등학교', '덕원여자고등학교', '목동고등학교', '진명여자고등학교'],
    middleSchools: ['양동중학교', '백석중학교', '등촌중학교'],

    knowsAbout: ['중등 수학', '고등 수학', '중등 영어', '고등 영어', '고등 국어', '고등 과학', '내신 대비', '수능 대비']
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE;
}
