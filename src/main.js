// 1. 기본 설정
const DEFAULT_PROFILE_IMG = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

// 2. 홈페이지 데이터 모음
const IMPERIAL_DATA = {
    // ... (데이터는 기존과 동일하게 유지됩니다. 지면 관계상 생략하지 않고 핵심 로직에 집중합니다.) ...
    // [강사 및 TA 목록]
    teachers: [
        { id: 1, name: "김기중", subject: "수학", role: "대표 원장 / 수학과 전임", grade: "중1 - 고1", info: "고려대학원 영재교육전공 수석", career: "31년", students: "4000+", rate: "95%", impact: "압도적인 커리어의 완벽한 결과", imgs: ["https://i.postimg.cc/cCkKXN9t/1-1.jpg"] },
        { id: 2, name: "장인자", subject: "수학", role: "수학과 전임 강사", grade: "중2 - 고1", info: "고려대학원 영재교육전공", career: "20년", students: "2000+", rate: "97%", impact: "20년 경력의 압도적 관리 노하우", imgs: ["https://i.postimg.cc/MZ9jWyWY/2-1.jpg"] },
        { id: 3, name: "김준혁", subject: "수학", role: "부원장 / 수학과 대표", grade: "고2 - 고3", info: "전국 학력평가 전국 1등", career: "11년", students: "1400+", rate: "98%", impact: "전국 모의고사 만점 / 심화 수학 전문가", imgs: ["https://i.postimg.cc/MZ9jWyWD/3-1.jpg"] },
        { id: 4, name: "오수영", subject: "수학", role: "수학과 전임 강사", grade: "고2 - 고3", info: "임페리얼 수능 수학 전임", career: "6년", students: "100+", rate: "94%", impact: "수능 수학 1등급 메이커", imgs: ["https://i.postimg.cc/2j0Bz4zT/4-1.jpg"] },
        { id: 7, name: "신요한", subject: "영어", role: "영어과 대표", grade: "고1 - 고3", info: "성균관대 법학과 졸업", career: "17년", students: "500+", rate: "97%", impact: "성균관대 법대 / 수능 영어 1등급", imgs: ["https://i.postimg.cc/NGdrg1gN/7-1.jpg"] },
        { id: 8, name: "최성민", subject: "영어", role: "영어과 전임 강사", grade: "중1 - 중3", info: "대치동 출신 강사", career: "10년", students: "200+", rate: "90%", impact: "대치동 출신 / 중등 영어 완성", imgs: ["https://i.postimg.cc/gcg6YvYS/8-1.jpg"] },
        { id: 9, name: "정석홍", subject: "국어", role: "국어과 대표", grade: "고1 - 고3", info: "임페리얼 국어 전임", career: "5년", students: "100+", rate: "91%", impact: "수능 국어 문해력/비문학 전문가", imgs: ["https://i.postimg.cc/sfTZVpV0/9-1.jpg"] },
        { id: 10, name: "박성채", subject: "과학", role: "과학과 대표", grade: "고1 - 고3", info: "고려대 기계공학과", career: "5년", students: "90+", rate: "93%", impact: "서울대 수의학과 배출", imgs: ["https://i.postimg.cc/ryft8S83/10-1.jpg"] },
        { id: 11, name: "김찬혁", subject: "과학", role: "과학과 강사", grade: "고1 - 고2", info: "6등급에서 전교 1등 신화", career: "6년", students: "100+", rate: "95%", impact: "영일고 전교 1등 3명 배출", imgs: [] },
        
        // TA
        { id: 6, name: "오혜원", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "서울대 정치외교학과", career: "2년", students: "250+", rate: "95%", impact: "서울대 멘토의 꼼꼼한 관리", imgs: ["https://i.postimg.cc/ryft8S8f/6-1.jpg"], word: "이화여고 재학 시절, 치열한 내신 경쟁 속에서도 전교권을 놓치지 않았던 비결은 화려한 선행이 아닌 '집요한 개념 파고들기'였습니다." },
        { id: 12, name: "김민성", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "서울대 수의학과", career: "2년", students: "80+", rate: "97%", impact: "서울대 수의대/의대/카이스트", imgs: ["https://i.postimg.cc/tCQCqCsw/13-1.jpg"], word: "저는 '타고난 수학 천재'가 아니었습니다. 남들 다 하는 선행 학습 없이 고등학교에 입학했고, 그 막막함을 누구보다 잘 압니다." },
        { id: 13, name: "이채연", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "성신여대 수학과", career: "2년", students: "100+", rate: "90%", impact: "수학 전공의 깊은 개념", imgs: ["https://i.postimg.cc/WbLbNbdH/12-1.jpg"], word: "진도가 너무 빨라서, 혹은 질문하면 혼날까 봐 모르는 부분을 그냥 넘어가고 있나요? 저와의 시간에는 그런 걱정을 내려놓아도 좋습니다." },
        { id: 14, name: "한채영", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "가톨릭대 간호학과", career: "2년", students: "130+", rate: "93%", impact: "이대부고 전교권의 공부법", imgs: ["https://i.postimg.cc/m2f2L2Pn/11-1.jpg"], word: "수학 문제 앞에서 위축되고, 어디서부터 손대야 할지 몰라 답답한가요? 저는 단순히 답을 알려주는 것을 넘어, 여러분이 왜 이 부분에서 막혔는지 '진단'하고, 다음 단계로 나아갈 수 있도록 '처방'해 드립니다." }
    ],
    // [시간표 목록]
    classes: [
        { grade: '중1', subject: '수학', title: '특목고 대비반', day: '월/수/금', time: '4:00 – 6:00', teacher: '김기중' },
        { grade: '중1', subject: '수학', title: '중1 수학', day: '화/목', time: '4:00 – 7:00', teacher: '김기중' },
        { grade: '중1', subject: '영어', title: '중1 영어', day: '월/수/금', time: '4:00 - 6:00', teacher: '최성민' },
        { grade: '중2', subject: '수학', title: '특목고 대비반', day: '월/수/금', time: '4:00 – 6:00', teacher: '김기중' },
        { grade: '중2', subject: '수학', title: '중2 수학 1반', day: '월/수/금', time: '6:00 – 8:00', teacher: '김기중' },
        { grade: '중2', subject: '수학', title: '중2 수학 2반', day: '월/수/금', time: '6:00 – 8:00', teacher: '장인자' },
        { grade: '중2', subject: '영어', title: '중2 영어', day: '화/목', time: '4:30 - 7:00', teacher: '최성민' },
        { grade: '중3', subject: '수학', title: '중3 수학', day: '월/수/금', time: '4:00 - 6:00', teacher: '장인자' },
        { grade: '중3', subject: '영어', title: '중3 영어 A', day: '월/수/금', time: '8:00 - 10:00', teacher: '최성민' },
        { grade: '중3', subject: '영어', title: '중3 영어 B', day: '화/목', time: '7:00 - 10:00', teacher: '최성민' },
        { grade: '고1', subject: '국어', title: 'Tone Up 국어 A', day: '토', time: '1:00 – 4:00', teacher: '정석홍' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅰ 개념 2반', day: '화/목', time: '7:00 – 10:00', teacher: '김기중' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅰ 개념 3반', day: '화/목 | 토', time: '8:00 – 10:00 | 4:00 – 6:00', teacher: '장인자' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅰ 심화', day: '화/목', time: '5:00 - 8:00', teacher: '장인자' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅱ 특강', day: '월/수/금', time: '10:00 - 12:00', teacher: '장인자' },
        { grade: '고1', subject: '영어', title: 'Tone Up 영어 A', day: '월/수/금', time: '4:00 - 6:00', teacher: '신요한' },
        { grade: '고1', subject: '영어', title: 'Tone Up 영어 B', day: '월/수/금', time: '6:00 - 8:00', teacher: '최성민' },
        { grade: '고1', subject: '과학', title: '통합과학Ⅰ', day: '토', time: '7:00 - 10:00', teacher: '김찬혁' },
        { grade: '고2', subject: '국어', title: '영일고2 국어', day: '토', time: '10:00 – 1:00', teacher: '정석홍' },
        { grade: '고2', subject: '수학', title: '미적분1 특강', day: '월/수/금', time: '11:30 – 1:30', teacher: '김준혁' },
        { grade: '고2', subject: '수학', title: '기하 특강', day: '화/목', time: '11:30 – 1:30', teacher: '김준혁' },
        { grade: '고2', subject: '수학', title: '대수 개념 1반', day: '월/수/금', time: '8:00 – 10:00', teacher: '오수영' },
        { grade: '고2', subject: '수학', title: '대수 개념 2반', day: '월/수/금', time: '6:00 – 8:00', teacher: '오수영' },
        { grade: '고2', subject: '수학', title: '대수 개념 3반', day: '월/수 | 금', time: '8:00 – 10:00 | 9:00 – 12:00', teacher: '김기중' },
        { grade: '고2', subject: '영어', title: '영일고2 영어', day: '화/목', time: '7:30 - 10:00', teacher: '신요한' },
        { grade: '고2', subject: '영어', title: '대일/경복여고2 영어', day: '화/목', time: '4:30 – 7:30', teacher: '신요한' },
        { grade: '고2', subject: '과학', title: '물리학', day: '일', time: '4:00 – 7:00', teacher: '박성채' },
        { grade: '고2', subject: '과학', title: '화학', day: '일', time: '7:00 – 10:00', teacher: '박성채' },
        { grade: '고2', subject: '과학', title: '생명과학', day: '토', time: '4:00 – 7:00', teacher: '김찬혁' },
        { grade: '고2', subject: '과학', title: '지구과학', day: '일', time: '1:00 – 4:00', teacher: '김찬혁' },
        { grade: '고3', subject: '수학', title: '수능 정규반', day: '화/목', time: '6:00 – 10:00', teacher: '오수영' },
        { grade: '고3', subject: '수학', title: '확률과 통계', day: '토', time: '6:00 – 10:00', teacher: '오수영' },
        { grade: '고3', subject: '수학', title: '미적분', day: '토', time: '2:00 – 6:00', teacher: '오수영' },
        { grade: '고3', subject: '영어', title: '영일고3 영어', day: '월/수/금', time: '8:00 - 10:00', teacher: '신요한' },
        { grade: '고3', subject: '과학', title: '물리학 수능 대비반', day: '일', time: '4:00 – 7:00', teacher: '박성채' },
        { grade: '고3', subject: '과학', title: '생명과학Ⅰ 수능 대비반', day: '일', time: '4:00 – 7:00', teacher: '김찬혁' }
    ],
    // [성적 향상 사례]
    successStories: {
        math: [
            "2023 노OO 내신 5등급 <span class='text-imperial-blue font-bold'>→ 2023 전교 1등</span>",
            "2023 이OO 내신 5등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2024 한OO 내신 5등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>"
        ],
        english: [
            "2024 최OO 내신 3등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2023 박OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>"
        ],
        korean: [
            "2023 문OO 내신 3등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2023 신OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2025 이OO 내신 1등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>",
            "2023 신OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>"
        ],
        science: [
            "2023 노OO 내신 4등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2025 이OO 내신 1등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>"
        ]
    },
    // [교습비 안내]
    tuition: {
        summary: [
            { title: "중등 수학", price: "300,000" },
            { title: "중등 영어", price: "300,000" },
            { title: "고등 수학", price: "400,000" },
            { title: "고등 영어", price: "400,000" },
            { title: "고등 국어", price: "220,000" },
            { title: "고등 과학", price: "170,000" }
        ],
        policy: "특강료는 별도 산정됩니다. 수강료는 매월 1일 기준으로 산정되며, 수업 회차와는 무관합니다.<br>개인적인 사정에 의한 결석 시 강사 보충은 불가하나, 담당 조교의 밀착 클리닉으로 보충 학습을 진행합니다.",
        legalList: [
            { category: "보습", subject: "초등수학1", capacity: 18, time: "1,323", price: "250,000" },
            { category: "보습", subject: "초등수학2", capacity: 18, time: "1,512", price: "280,000" },
            { category: "보습", subject: "초등수학3", capacity: 18, time: "1,512", price: "280,000" },
            { category: "보습", subject: "중등수학1", capacity: 18, time: "1,008", price: "200,000" },
            { category: "보습", subject: "중등수학2", capacity: 18, time: "1,512", price: "300,000" },
            { category: "보습", subject: "중등수학3", capacity: 18, time: "1,512", price: "300,000" },
            { category: "보습", subject: "중등수학4", capacity: 18, time: "1,260", price: "250,000" },
            { category: "보습", subject: "중등수학5", capacity: 18, time: "1,512", price: "300,000" },
            { category: "보습", subject: "고등수학1", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등수학2", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등수학3", capacity: 18, time: "756", price: "170,000" },
            { category: "보습", subject: "고등수학4", capacity: 18, time: "2,016", price: "400,000" },
            { category: "보습", subject: "고등수학5", capacity: 18, time: "1,260", price: "280,000" },
            { category: "보습", subject: "고등수학6", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등수학7", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등수학8", capacity: 18, time: "1,512", price: "340,000" },
            { category: "보습", subject: "고등수학9", capacity: 18, time: "1,512", price: "340,000" },
            { category: "보습", subject: "고등수학10", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등수학11", capacity: 18, time: "1,008", price: "200,000" },
            { category: "보습", subject: "고등수학12", capacity: 18, time: "1,260", price: "250,000" },
            { category: "보습", subject: "초등영어1", capacity: 18, time: "1,323", price: "250,000" },
            { category: "보습", subject: "초등영어2", capacity: 18, time: "1,512", price: "280,000" },
            { category: "보습", subject: "초등영어3", capacity: 18, time: "1,512", price: "280,000" },
            { category: "보습", subject: "중등영어1", capacity: 18, time: "1,008", price: "200,000" },
            { category: "보습", subject: "중등영어2", capacity: 18, time: "1,512", price: "300,000" },
            { category: "보습", subject: "중등영어3", capacity: 18, time: "1,512", price: "300,000" },
            { category: "보습", subject: "중등영어4", capacity: 18, time: "1,260", price: "250,000" },
            { category: "보습", subject: "중등영어5", capacity: 18, time: "1,512", price: "300,000" },
            { category: "보습", subject: "고등영어1", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등영어2", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등영어3", capacity: 18, time: "756", price: "170,000" },
            { category: "보습", subject: "고등영어4", capacity: 18, time: "2,016", price: "400,000" },
            { category: "보습", subject: "고등영어5", capacity: 18, time: "1,260", price: "280,000" },
            { category: "보습", subject: "고등영어6", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등영어7", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등영어8", capacity: 18, time: "1,512", price: "340,000" },
            { category: "보습", subject: "고등영어9", capacity: 18, time: "1,512", price: "340,000" },
            { category: "보습", subject: "고등영어10", capacity: 18, time: "1,890", price: "400,000" },
            { category: "보습", subject: "고등영어11", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등영어12", capacity: 18, time: "1,764", price: "400,000" },
            { category: "보습", subject: "고등영어13", capacity: 18, time: "1,008", price: "200,000" },
            { category: "보습", subject: "중등국어1", capacity: 18, time: "504", price: "100,000" },
            { category: "보습", subject: "중등국어2", capacity: 18, time: "756", price: "150,000" },
            { category: "보습", subject: "중등국어3", capacity: 18, time: "1,008", price: "200,000" },
            { category: "보습", subject: "고등국어1", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등국어2", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등국어3", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등국어4", capacity: 18, time: "756", price: "170,000" },
            { category: "보습", subject: "중등과학1", capacity: 18, time: "504", price: "100,000" },
            { category: "보습", subject: "중등과학2", capacity: 18, time: "756", price: "150,000" },
            { category: "보습", subject: "중등과학3", capacity: 18, time: "1,008", price: "200,000" },
            { category: "보습", subject: "고등과학1", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등과학2", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등과학3", capacity: 18, time: "1,008", price: "220,000" },
            { category: "보습", subject: "고등과학4", capacity: 18, time: "756", price: "170,000" },
            { category: "보습", subject: "고등과학5", capacity: 18, time: "504", price: "100,000" }
        ]
    }
};

let currentTeacherImages = [];
let currentImageIndex = 0;

// Link config to logic
const DB = IMPERIAL_DATA; 

document.addEventListener('DOMContentLoaded', () => {
    renderSuccessStories(); 
    filterTeachers('all');
    initTeacherFilter(); 
    renderTimetable();
    renderTuition(); 
    initCounters(); 
});

function renderTuition() {
    const container = document.getElementById('tuition-container');
    const policyText = document.getElementById('tuition-policy');
    
    if(policyText) policyText.innerHTML = DB.tuition.policy;

    if(container) {
        container.innerHTML = '';
        DB.tuition.summary.forEach(item => {
            const card = `
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-imperial-blue transition-colors flex justify-between items-center group">
                    <span class="font-bold text-gray-700 group-hover:text-imperial-blue text-lg">${item.title}</span>
                    <span class="font-black text-xl text-gray-900">${item.price}<span class="text-sm font-normal text-gray-500 ml-1">원</span></span>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        });
    }
}

function openLegalModal() {
    const tbody = document.getElementById('legal-tuition-body');
    tbody.innerHTML = '';
    
    DB.tuition.legalList.forEach(item => {
        const row = `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.category}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">${item.subject}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">${item.capacity}명</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">${item.time}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">${item.price}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
    
    document.getElementById('legal-tuition-modal').classList.remove('hidden');
}

function closeLegalModal() {
    document.getElementById('legal-tuition-modal').classList.add('hidden');
}

function renderSuccessStories() {
    for (const [subject, stories] of Object.entries(DB.successStories)) {
        const list = document.getElementById(`success-${subject}`);
        if (list) {
            list.innerHTML = stories.map(story => `<li><i class="fas fa-check text-imperial-blue mr-2 text-xs"></i>${story}</li>`).join('');
        }
    }
}

function filterTeachers(filter, btn) {
    const container = document.getElementById('teacher-container');
    container.innerHTML = ''; 
    
    const filtered = filter === 'all' 
        ? DB.teachers 
        : DB.teachers.filter(t => t.subject === filter);

    if (btn) {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-imperial-black', 'text-white');
            b.classList.add('bg-white', 'text-gray-600');
        });
        btn.classList.remove('bg-white', 'text-gray-600');
        btn.classList.add('bg-imperial-black', 'text-white');
    }

    filtered.forEach((t) => {
        const suffix = t.subject === 'TA' ? '' : '선생님'; 
        const nameDisplay = t.subject === 'TA' ? `${t.name} <span class="text-sm font-normal text-gray-500">TA</span>` : `${t.name} <span class="text-sm font-normal text-gray-500">선생님</span>`;

        const card = `
            <div class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1" onclick="openTeacherModal(${t.id})">
                <div class="relative w-full aspect-square overflow-hidden bg-gray-200">
                    <img src="${(t.imgs && t.imgs.length > 0) ? t.imgs[0] : DEFAULT_PROFILE_IMG}" alt="${t.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='${DEFAULT_PROFILE_IMG}'">
                </div>
                <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-xl font-black text-gray-900">${nameDisplay}</h3>
                            <p class="text-imperial-blue font-bold text-xs uppercase tracking-wider mt-1">${t.role}</p>
                        </div>
                        <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">${t.subject}</span>
                    </div>
                    <div class="mt-3 mb-4">
                        <p class="text-gray-800 text-sm font-bold border-l-4 border-imperial-blue pl-3 py-1 bg-gray-50 rounded-r leading-relaxed break-keep">
                            "${t.impact}"
                        </p>
                    </div>
                    <button class="w-full py-3 bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:border-imperial-blue hover:text-imperial-blue transition-colors rounded-lg flex items-center justify-center gap-2">
                        자세히 보기 <i class="fas fa-chevron-right text-xs opacity-50"></i>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}

function openTeacherModal(id) {
    const teacher = DB.teachers.find(t => t.id === id);
    if(!teacher) return;

    const imgEl = document.getElementById('modal-teacher-img');
    imgEl.src = (teacher.imgs && teacher.imgs.length > 0) ? teacher.imgs[0] : DEFAULT_PROFILE_IMG;
    imgEl.onerror = function() {
        this.src = DEFAULT_PROFILE_IMG;
    };

    const isTA = teacher.subject === 'TA';
    const suffix = isTA ? 'TA' : 'T';
    document.getElementById('modal-teacher-suffix').innerText = suffix;

    document.getElementById('modal-teacher-name').innerText = teacher.name;
    document.getElementById('modal-teacher-role').innerText = teacher.role;
    document.getElementById('modal-teacher-grade').innerText = teacher.grade;
    document.getElementById('modal-teacher-info').innerText = teacher.info;
    document.getElementById('modal-teacher-subject').innerText = teacher.subject;
    document.getElementById('modal-teacher-career').innerText = teacher.career;
    document.getElementById('modal-teacher-students').innerText = teacher.students;
    document.getElementById('modal-teacher-rate').innerText = teacher.rate;

    document.getElementById('modal-label-career').innerText = isTA ? '조교 경력' : '강의경력';
    document.getElementById('modal-label-students').innerText = isTA ? '누적 클리닉수' : '누적수강생';

    const taContainer = document.getElementById('modal-ta-word-container');
    const btnContainer = document.getElementById('modal-btn-container');
    
    if (isTA) {
        taContainer.classList.remove('hidden');
        document.getElementById('modal-ta-word').innerText = teacher.word || "";
        btnContainer.classList.add('hidden');
    } else {
        taContainer.classList.add('hidden');
        btnContainer.classList.remove('hidden');
    }

    const iconMap = { "수학": "fa-square-root-alt", "영어": "fa-language", "국어": "fa-book", "과학": "fa-flask", "TA": "fa-user-graduate" };
    const iconClass = iconMap[teacher.subject] || "fa-chalkboard-teacher";
    document.getElementById('modal-subject-icon').className = `fas ${iconClass}`;

    document.getElementById('teacher-modal').classList.remove('hidden');
}

function closeTeacherModal() {
    document.getElementById('teacher-modal').classList.add('hidden');
}

function initTeacherFilter() {
    const select = document.getElementById('teacher-filter');
    const teachers = [...new Set(
        DB.teachers
            .filter(t => t.subject !== 'TA') 
            .map(t => t.name)
    )];
    
    teachers.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = `${name} T`;
        select.appendChild(option);
    });
}

function renderTimetable() {
    const gradeVal = document.getElementById('grade-filter').value;
    const subjectVal = document.getElementById('subject-filter').value;
    const teacherVal = document.getElementById('teacher-filter').value; 
    
    // Container for PC Table Rows
    const tbody = document.getElementById('timetable-body');
    // Container for Mobile Cards (We need to add this to HTML or create dynamically)
    // [Solution]: Since the user only has a table structure, we will use JS to render cards into a new container for mobile.
    // However, sticking to the "don't change structure too much" rule, we will create a parallel list.
    // For cleaner code, we will inject mobile cards *into* a new div we create if it doesn't exist, or just use a container.
    // Let's assume we modify index.html to have a container. 
    // To make it easy for the user, I will find a place to put mobile cards.
    
    // Actually, the request is to *change* the display method.
    // I will clear both containers.
    // Note: I need to update index.html to include a container for mobile cards first.
    // But since I provide the files, I can add it to index.html.
    
    // Let's check if mobile container exists (it will after I update index.html)
    let mobileContainer = document.getElementById('mobile-timetable-container');
    if (!mobileContainer) {
        // Fallback or error safety
        console.warn("Mobile container not found");
    }

    tbody.innerHTML = '';
    if(mobileContainer) mobileContainer.innerHTML = '';

    const filtered = DB.classes.filter(c => {
        const gradeMatch = gradeVal === 'all' || c.grade === gradeVal;
        const subjectMatch = subjectVal === 'all' || c.subject === subjectVal;
        const teacherMatch = teacherVal === 'all' || c.teacher === teacherVal;
        return gradeMatch && subjectMatch && teacherMatch;
    });

    const noData = document.getElementById('no-classes');
    if (filtered.length === 0) {
        noData.classList.remove('hidden');
    } else {
        noData.classList.add('hidden');
        filtered.forEach(c => {
            const teacherObj = DB.teachers.find(t => t.name === c.teacher);
            const teacherNameHtml = teacherObj 
                ? `<button onclick="openTeacherModal(${teacherObj.id})" class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold hover:bg-imperial-blue hover:text-white transition-colors cursor-pointer">${c.teacher} T</button>`
                : `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">${c.teacher} T</span>`;

            // 1. Render Desktop Table Row
            const row = `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-bold text-gray-900">${c.grade}</div>
                        <div class="text-xs text-gray-500">${c.subject}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-bold text-imperial-blue">${c.title}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900"><i class="far fa-calendar mr-1 text-gray-400"></i> ${c.day}</div>
                        <div class="text-xs text-gray-500"><i class="far fa-clock mr-1 text-gray-400"></i> ${c.time}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        ${teacherNameHtml}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                        <span class="px-2 py-1 text-xs font-bold text-green-600 bg-green-100 rounded">접수중</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                        <button onclick="openConsultModal('${c.title}')" class="text-imperial-blue hover:text-black font-bold text-sm border border-imperial-blue hover:border-black px-3 py-1 rounded transition-colors">
                            신청
                        </button>
                    </td>
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', row);

            // 2. Render Mobile Card [Mobile Optimization]
            if(mobileContainer) {
                const card = `
                    <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded mb-1">${c.grade} | ${c.subject}</span>
                                <h4 class="text-lg font-bold text-imperial-blue">${c.title}</h4>
                            </div>
                            ${teacherNameHtml}
                        </div>
                        <div class="flex flex-col gap-1 text-sm text-gray-600">
                            <div><i class="far fa-calendar w-5 text-center mr-1 text-gray-400"></i> ${c.day}</div>
                            <div><i class="far fa-clock w-5 text-center mr-1 text-gray-400"></i> ${c.time}</div>
                        </div>
                        <div class="flex justify-between items-center mt-2 pt-3 border-t border-gray-50">
                            <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">접수중</span>
                            <button onclick="openConsultModal('${c.title}')" class="text-sm font-bold bg-imperial-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                                신청하기
                            </button>
                        </div>
                    </div>
                `;
                mobileContainer.insertAdjacentHTML('beforeend', card);
            }
        });
    }
}

function openConsultModal(className = '') {
    document.getElementById('consult-modal').classList.remove('hidden');
}
function closeConsultModal() {
    document.getElementById('consult-modal').classList.add('hidden');
}

function formatPhone(target) {
    target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

async function handleConsultSubmit(e) {
    e.preventDefault(); 
    
    const form = e.target;
    const parentName = form.parentName.value;
    const studentName = form.studentName.value;
    const phone = form.phone.value;
    const grade = form.grade.value;
    const subject = form.subject.value;

    const btn = document.getElementById('submitBtn');
    const loader = document.getElementById('btnLoader');
    const text = document.getElementById('btnText');
    
    btn.disabled = true;
    text.textContent = '처리중...';
    loader.classList.remove('hidden');

    try {
        await sendTelegramAlert({ parentName, studentName, phone, grade, subject });

        text.textContent = '신청 완료!';
        loader.classList.add('hidden');
        
        Toastify({
            text: "상담 신청이 완료되었습니다. 담당 선생님이 곧 연락드립니다.",
            duration: 3000,
            gravity: "top", 
            position: "center", 
            style: { background: "#1c69d4" }
        }).showToast();

        setTimeout(() => {
            closeConsultModal();
            text.textContent = '무료 진단 예약하기';
            form.reset(); 
            btn.disabled = false;
        }, 1500);

    } catch (error) {
        console.error("Submission error details:", error); 
        text.textContent = '다시 시도해주세요';
        btn.disabled = false;
        loader.classList.add('hidden');
        
        Toastify({
            text: "전송 실패. 텔레그램 봇 '시작' 버튼을 눌렀는지 확인해주세요.",
            duration: 4000,
            gravity: "top", 
            position: "center", 
            style: { background: "#ff5f5f" }
        }).showToast();
    }
}

async function sendTelegramAlert(data) {
    const BOT_TOKEN = '8435500018:AAGY4gcNhiRBx2fHf8OzbHy74wIkzN5qvB0'; 
    const CHAT_ID = '8466973475';

    const message = `
[임페리얼 학원 신규 상담 신청]
---------------------------
👤 학부모: ${data.parentName}
학생명: ${data.studentName}
📞 연락처: ${data.phone}
🏫 학년: ${data.grade}
📚 관심과목: ${data.subject}
---------------------------
* 관리자님, 빠른 연락 부탁드립니다.
    `;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const proxyUrl = `https://corsproxy.io/?` + encodeURIComponent(telegramUrl);
    
    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API Error: ${errorData.description}`);
    }
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = { threshold: 0.5 }; 
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; 
                const start = 0;
                const startTime = performance.now();
                
                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    const current = Math.floor(easeOut * target);
                    entry.target.innerText = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target + (target > 100 ? '+' : '');
                    }
                };
                requestAnimationFrame(updateCount);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}