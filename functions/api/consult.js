/**
 * 상담 신청 전송 (Cloudflare Pages Functions)
 * ---------------------------------------------------------------------------
 * 예전에는 브라우저가 텔레그램 API를 직접 호출했기 때문에 봇 토큰이 src/main.js 안에
 * 그대로 노출됐습니다. 토큰을 가진 사람은 접수된 학부모·학생 개인정보를 모두 읽을 수
 * 있으므로, 토큰을 서버(Cloudflare) 환경변수로 옮기고 이 함수가 대신 전송합니다.
 *
 * 필요한 환경변수 (Cloudflare Pages > Settings > Environment variables):
 *   TELEGRAM_BOT_TOKEN  — BotFather에서 새로 발급받은 토큰
 *   TELEGRAM_CHAT_ID    — 알림을 받을 채팅방 ID
 *
 * 엔드포인트: POST /api/consult
 */

const FIELDS = ['parentName', 'studentName', 'phone', 'grade', 'subject'];

/** 텔레그램으로 넘기기 전에 길이를 자르고 제어문자를 제거합니다. */
function clean(value, max = 60) {
    return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

export async function onRequestPost({ request, env }) {
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
        return json({ ok: false, error: 'not_configured' }, 500);
    }

    let data;
    try {
        data = await request.json();
    } catch {
        return json({ ok: false, error: 'bad_request' }, 400);
    }

    const v = {};
    for (const f of FIELDS) v[f] = clean(data[f]);
    if (!v.parentName || !v.studentName || !v.phone) {
        return json({ ok: false, error: 'missing_fields' }, 400);
    }

    const text = [
        '[임페리얼 학원 신규 상담 신청]',
        '---------------------------',
        `학부모: ${v.parentName}`,
        `학생명: ${v.studentName}`,
        `연락처: ${v.phone}`,
        `학년: ${v.grade}`,
        `관심과목: ${v.subject}`,
        '---------------------------',
        '* 관리자님, 빠른 연락 부탁드립니다.'
    ].join('\n');

    const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text })
    });

    if (!res.ok) {
        return json({ ok: false, error: 'telegram_failed' }, 502);
    }

    return json({ ok: true });
}

function json(body, status) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
}
