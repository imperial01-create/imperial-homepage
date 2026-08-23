// 1. 기본 설정
const DEFAULT_PROFILE_IMG = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

// 2. 홈페이지 데이터 모음
const IMPERIAL_DATA = {
    // 아래 데이터를 수정할 때 해당 항목의 날짜도 함께 고쳐 주세요.
    // sitemap.xml 의 lastmod 와 JSON-LD 의 dateModified 가 이 값을 사용합니다.
    lastUpdated: {
        teachers: '2026-08-24',
        classes: '2026-08-24',
        tuition: '2026-08-24',
        faq: '2026-08-24'
    },
    // ... (데이터는 기존과 동일하게 유지됩니다. 지면 관계상 생략하지 않고 핵심 로직에 집중합니다.) ...
    // [강사 및 TA 목록]
    teachers: [
        { id: 1, name: "김기중", subject: "수학", role: "대표 원장 / 수학과 전임", grade: "중1 - 고1", info: "고려대학원 영재교육전공 수석", career: "31년", students: "4000+", rate: "95%", impact: "압도적인 커리어의 완벽한 결과", alumniOf: "고려대학교 대학원", imgs: ["https://i.postimg.cc/cCkKXN9t/1-1.jpg"] },
        { id: 2, name: "장인자", subject: "수학", role: "수학과 전임 강사", grade: "중2 - 고1", info: "고려대학원 영재교육전공", career: "20년", students: "2000+", rate: "97%", impact: "20년 경력의 압도적 관리 노하우", alumniOf: "고려대학교 대학원", imgs: ["https://i.postimg.cc/MZ9jWyWY/2-1.jpg"] },
        { id: 3, name: "김준혁", subject: "수학", role: "부원장 / 수학과 대표", grade: "고2 - 고3", info: "전국 학력평가 전국 1등", career: "11년", students: "1400+", rate: "98%", impact: "전국 모의고사 만점 / 심화 수학 전문가", imgs: ["https://i.postimg.cc/MZ9jWyWD/3-1.jpg"] },
        { id: 7, name: "신요한", subject: "영어", role: "영어과 대표", grade: "고1 - 고3", info: "성균관대 법학과 졸업", career: "17년", students: "500+", rate: "97%", impact: "성균관대 법대 / 수능 영어 1등급", alumniOf: "성균관대학교", imgs: ["https://i.postimg.cc/NGdrg1gN/7-1.jpg"] },
        { id: 8, name: "최성민", subject: "영어", role: "영어과 전임 강사", grade: "중1 - 중3", info: "대치동 출신 강사", career: "10년", students: "200+", rate: "90%", impact: "대치동 출신 / 중등 영어 완성", imgs: ["https://i.postimg.cc/gcg6YvYS/8-1.jpg"] },
        { id: 9, name: "정석홍", subject: "국어", role: "국어과 대표", grade: "고1 - 고3", info: "임페리얼 국어 전임", career: "5년", students: "100+", rate: "91%", impact: "수능 국어 문해력/비문학 전문가", imgs: ["https://i.postimg.cc/sfTZVpV0/9-1.jpg"] },
        { id: 10, name: "박성채", subject: "과학", role: "과학과 대표", grade: "고1 - 고3", info: "고려대 기계공학과", career: "5년", students: "90+", rate: "93%", impact: "서울대 수의학과 배출", alumniOf: "고려대학교", imgs: ["https://i.postimg.cc/ryft8S83/10-1.jpg"] },
        { id: 11, name: "김찬혁", subject: "과학", role: "과학과 강사", grade: "고1 - 고2", info: "6등급에서 전교 1등 신화", career: "6년", students: "100+", rate: "95%", impact: "영일고 전교 1등 3명 배출", imgs: [] },
        
        // TA
        { id: 6, name: "오혜원", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "서울대 정치외교학과", career: "2년", students: "250+", rate: "95%", impact: "서울대 멘토의 꼼꼼한 관리", imgs: ["https://i.postimg.cc/ryft8S8f/6-1.jpg"], word: "이화여고 재학 시절, 치열한 내신 경쟁 속에서도 전교권을 놓치지 않았던 비결은 화려한 선행이 아닌 '집요한 개념 파고들기'였습니다." },
        { id: 13, name: "이채연", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "성신여대 수학과", career: "2년", students: "100+", rate: "90%", impact: "수학 전공의 깊은 개념", imgs: ["https://i.postimg.cc/WbLbNbdH/12-1.jpg"], word: "진도가 너무 빨라서, 혹은 질문하면 혼날까 봐 모르는 부분을 그냥 넘어가고 있나요? 저와의 시간에는 그런 걱정을 내려놓아도 좋습니다." },
        { id: 14, name: "한채영", subject: "TA", role: "수학 클리닉", grade: "중/고등", info: "가톨릭대 간호학과", career: "2년", students: "130+", rate: "93%", impact: "이대부고 전교권의 공부법", imgs: ["https://i.postimg.cc/m2f2L2Pn/11-1.jpg"], word: "수학 문제 앞에서 위축되고, 어디서부터 손대야 할지 몰라 답답한가요? 저는 단순히 답을 알려주는 것을 넘어, 여러분이 왜 이 부분에서 막혔는지 '진단'하고, 다음 단계로 나아갈 수 있도록 '처방'해 드립니다." }
    ],
    // [시간표 목록]
    classes: [
        { grade: '중1', subject: '수학', title: '중1 수학 A반', day: '화/목 | 토', time: '4:30 - 7:00 | 10:00 - 12:00', teacher: '김기중' },
        { grade: '중1', subject: '수학', title: '중1 수학 B반', day: '월/수/금', time: '4:00 - 6:00', teacher: '김기중' },
        { grade: '중1', subject: '영어', title: '중1 영어', day: '월/수/금', time: '6:00 - 8:00', teacher: '최성민' },
        { grade: '중2', subject: '수학', title: '중2 수학', day: '월/수/금', time: '6:00 - 8:00', teacher: '김기중' },
        { grade: '중2', subject: '수학', title: '중2 수학 특강', day: '화/목 | 토', time: '10:00 - 12:00 | 2:00 - 4:00', teacher: '김기중' },
        { grade: '중2', subject: '영어', title: '중2 영어 A', day: '화/목', time: '4:00 - 7:00', teacher: '최성민' },
        { grade: '중2', subject: '영어', title: '중2 영어 특강', day: '월/수/금', time: '2:00 - 4:00', teacher: '최성민' },
        { grade: '중3', subject: '수학', title: '중3 수학', day: '월/수/금', time: '4:00 - 6:00', teacher: '장인자' },
        { grade: '중3', subject: '수학', title: '공통수학Ⅰ 특강', day: '화/목', time: '5:00 - 7:00', teacher: '장인자' },
        { grade: '중3', subject: '영어', title: '중3 영어 A', day: '월/수/금', time: '8:00 - 10:00', teacher: '최성민' },
        { grade: '중3', subject: '영어', title: '중3 영어 B', day: '화/목', time: '7:00 - 10:00', teacher: '최성민' },
        { grade: '고1', subject: '국어', title: '영일고1 국어', day: '토', time: '1:00 - 4:00', teacher: '정석홍' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅱ B반', day: '화/목', time: '7:00 - 10:00', teacher: '김기중' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅱ 함수 특강', day: '월/수/금', time: '2:00 - 4:00', teacher: '김기중' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅱ A반', day: '화/목', time: '7:00 - 10:00', teacher: '장인자' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅱ S반', day: '월/수/금', time: '8:00 - 10:00', teacher: '장인자' },
        { grade: '고1', subject: '수학', title: '공통수학Ⅱ 함수 특강', day: '월-금', time: '10:00 - 12:00', teacher: '장인자' },
        { grade: '고1', subject: '영어', title: '영일고1 영어 A반', day: '월/수/금', time: '8:00 - 10:00', teacher: '신요한' },
        { grade: '고1', subject: '영어', title: '영일고1 영어 S반', day: '화/목', time: '7:00 - 10:00', teacher: '신요한' },
        { grade: '고1', subject: '과학', title: '통합과학Ⅱ 1반', day: '토', time: '7:00 - 10:00', teacher: '김찬혁' },
        { grade: '고1', subject: '과학', title: '통합과학Ⅱ 2반', day: '일', time: '7:00 - 10:00', teacher: '김찬혁' },
        { grade: '고2', subject: '국어', title: '영일고2 국어', day: '토', time: '10:00 - 1:00', teacher: '정석홍' },
        { grade: '고2', subject: '수학', title: '확률과 통계 개념 특강', day: '월/수/금', time: '2:00 - 4:00', teacher: '김준혁' },
        { grade: '고2', subject: '수학', title: '미적분1 S반', day: '월/수/금', time: '8:00 - 10:00', teacher: '김준혁' },
        { grade: '고2', subject: '수학', title: '미적분1 A반', day: '화/목', time: '6:00 - 10:00', teacher: '김준혁' },
        { grade: '고2', subject: '수학', title: '대수 A반', day: '월/수/금', time: '6:00 - 8:00', teacher: '장인자' },
        { grade: '고2', subject: '영어', title: '영일고2 영어 A반', day: '월/수/금', time: '4:00 - 6:00', teacher: '신요한' },
        { grade: '고2', subject: '영어', title: '영일고2 영어 B반', day: '월/수/금', time: '6:00 - 8:00', teacher: '신요한' },
        { grade: '고2', subject: '영어', title: '대일고2 영어', day: '화/목', time: '4:00 - 7:00', teacher: '신요한' },
        { grade: '고2', subject: '과학', title: '물리학', day: '일', time: '4:00 - 7:00', teacher: '박성채' },
        { grade: '고2', subject: '과학', title: '화학', day: '일', time: '7:00 - 10:00', teacher: '박성채' },
        { grade: '고2', subject: '과학', title: '생명과학', day: '토', time: '4:00 - 7:00', teacher: '김찬혁' },
        { grade: '고3', subject: '수학', title: '수능 수학 정규반 (수Ⅰ+수Ⅱ)', day: '월/수/금', time: '6:00 - 8:00', teacher: '김준혁' },
        { grade: '고3', subject: '수학', title: '미적분 수능대비반', day: '월/수/금', time: '5:00 - 6:00', teacher: '김준혁' },
        { grade: '고3', subject: '과학', title: '물리학 수능 대비반', day: '일', time: '3:00 - 4:00', teacher: '박성채' },
        { grade: '고3', subject: '과학', title: '생명과학Ⅰ 수능 대비반', day: '토', time: '9:00 - 12:00', teacher: '김찬혁' }
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
            "2023 박OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>",
            "2023 강OO 내신 4등급 <span class='text-imperial-blue font-bold'>→ 2026 전교 1등</span>"
        ],
        korean: [
            "2023 문OO 내신 3등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2023 신OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2025 이OO 내신 1등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>",
            "2023 신OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>"
        ],
        science: [
            "2023 노OO 내신 4등급 <span class='text-imperial-blue font-bold'>→ 2024 전교 1등</span>",
            "2025 이OO 내신 1등급 <span class='text-imperial-blue font-bold'>→ 2025 전교 1등</span>",
            "2025 전OO 내신 2등급 <span class='text-imperial-blue font-bold'>→ 2026 전교 1등</span>"
        ]
    },
    // [자주 묻는 질문]
    faq: [
        {
            category: "입학 관련",
            icon: "fa-door-open",
            items: [
                {
                    q: "학기 중 수시 입학도 가능한가요?",
                    a: "목동임페리얼학원은 학기 중 수시 편입이 가능합니다. 정규 개강일 외에도 상담 결과에 따라 학생에게 적합한 반이 있을 경우 언제든 편입하실 수 있습니다."
                },
                {
                    q: "레벨테스트는 어떻게 진행되나요?",
                    a: "레벨테스트는 상담 담당 선생님과의 상담에서 학생의 정밀 진단이 필요하다고 판단되는 경우에만 진행됩니다. 단순한 레벨테스트보다 상담 전문 선생님과의 상담이 학생의 현재 상태와 실력을 평가하는 데 더욱 적합하기 때문입니다."
                },
                {
                    q: "반 편성 기준은 무엇인가요?",
                    a: "반 편성 기준은 해당 과목에 대한 학생의 이해 속도입니다. 성적보다도 이해 속도에 따라 학생에게 도움이 되는 강의가 달라지기 때문이며, 이에 대한 판단은 상담 선생님이 직접 진행합니다."
                },
                {
                    q: "정원이 마감된 반도 등록할 수 있나요?",
                    a: "정원이 마감된 반은 대기 순번을 안내해 드리며, 자리가 생기는 대로 순번에 따라 차례대로 연락드립니다."
                },
                {
                    q: "주로 어느 학교 학생들이 다니나요?",
                    a: "고등학교는 영일고, 경복여고, 대일고, 마포고, 명덕여고, 세현고, 광영여고, 덕원여고, 목동고, 진명여고 등 다양한 학교의 학생들이 수업을 듣고 있습니다.<br>중학교는 양동중, 백석중, 등촌중 학생들이 주를 이루며, 이외에도 다양한 학교의 학생들이 함께 수업을 듣고 있습니다."
                }
            ]
        },
        {
            category: "수업 및 커리큘럼 관련",
            icon: "fa-book-open",
            items: [
                {
                    q: "결석 시 보강은 어떻게 진행되나요?",
                    a: "개인적인 사정에 의한 결석 시 강사 보충은 불가하나, 당일 수업 녹화본을 제공해 드리며 주말 클리닉 시간을 활용하여 담당 조교의 1:1 밀착 보충 학습을 진행합니다."
                },
                {
                    q: "한 반 정원은 몇 명인가요?",
                    a: "목동임페리얼학원의 반 정원은 강좌마다 다릅니다. 담당 강사의 강의 스타일과 학원의 판단에 따라 반별 최적 인원을 정하며, 학원 교습비 등 게시표에 신고된 교습과정별 정원은 18명입니다."
                },
                {
                    q: "선행 학습은 어느 정도까지 진행되나요?",
                    a: "선행 학습과 관련된 사항은 관련 법령(공교육 정상화 촉진 및 선행교육 규제에 관한 특별법)에 따라 유선으로만 안내해 드리고 있습니다. 02-2644-1178로 문의해 주시기 바랍니다."
                },
                {
                    q: "과제량은 어느 정도이며, 미이행 시 어떻게 관리되나요?",
                    a: "과제는 학생의 상태와 수준 등을 종합적으로 고려하여 학생의 발전에 필요한 만큼 부여됩니다. 여러 과목을 수강하는 경우 매주 담당 선생님들이 학생의 상태를 공유하여 과제량을 일시적으로 조정하기도 합니다. 과제 미이행 시에는 조교와의 보충을 기본으로 진행합니다."
                },
                {
                    q: "교재는 무엇을 사용하며, 교재비는 수강료에 포함되나요?",
                    a: "교재는 강사별, 강의별로 차이가 있으며, 교재비는 수강료에 포함되지 않고 별도로 산정됩니다."
                },
                {
                    q: "시험 기간에는 시간표가 어떻게 운영되나요?",
                    a: "시험 전날 또는 이틀 전에 직전 보충 수업을 진행합니다. 직전 보충 수업은 시험 기간 중 진행되지 않는 수업 시간을 앞당겨 진행하는 것으로 처리됩니다."
                },
                {
                    q: "특강은 어떻게 신청하나요?",
                    a: "학원에서 발송해 드리는 가정통신문에 회신하시거나, 전화 또는 문자로 신청하실 수 있습니다. 특강 종류별로 교습비가 상이하므로 자세한 비용은 학원으로 문의해 주시기 바랍니다."
                }
            ]
        },
        {
            category: "학생 관리 및 소통 관련",
            icon: "fa-comments",
            items: [
                {
                    q: "스터디존은 자유롭게 이용할 수 있나요?",
                    a: "재원생 누구나 학원 개방 시간 내에 자유롭게 이용할 수 있으며, 관리 조교가 상주하여 엄격한 면학 분위기를 유지합니다. 개방 시간은 학기 중에는 평일 14:00 - 22:00, 주말 10:00 - 22:00이며, 방학 중에는 매일 10:00 - 22:00입니다."
                },
                {
                    q: "학부모와는 어떻게 소통하나요?",
                    a: "매월 학생별 학습 상황 리포트를 정기적으로 발송해 드리며, 학부모 전용 카카오톡 채널을 통해 상시 상담을 지원합니다."
                },
                {
                    q: "조교 클리닉은 어떻게 신청하나요?",
                    a: "홈페이지 우측 상단의 로그인 버튼을 통해 임페리얼 시스템에 접속하시면, 클리닉 센터에서 무료로 신청하실 수 있습니다. 평일에는 누구나 방문하여 질문할 수 있는 오픈 클리닉으로, 주말에는 1:1 심층 관리가 이루어지는 개인 클리닉으로 운영됩니다."
                },
                {
                    q: "등·하원 알림을 받을 수 있나요?",
                    a: "목동임페리얼학원 카카오톡 채널의 알림톡을 통해 등·하원 알림을 보내드립니다."
                },
                {
                    q: "수업 중 학생 휴대폰은 어떻게 관리되나요?",
                    a: "원내에서는 휴대폰 사용이 불가하며, 등원 시 휴대폰을 제출해야 합니다. 학생이 학원에 있는 동안 연락이 필요하신 경우 학원(02-2644-1178)으로 연락 주시기 바랍니다."
                },
                {
                    q: "'임페리얼 시스템'은 무엇인가요?",
                    a: "임페리얼 시스템은 목동임페리얼학원의 재원생, 학부모, 강사, 조교를 위한 자체 시스템으로, 학생의 학습을 돕기 위해 지속적으로 개발하고 있습니다."
                }
            ]
        },
        {
            category: "수강료 및 환불 안내",
            icon: "fa-credit-card",
            items: [
                {
                    q: "목동임페리얼학원 수강료는 얼마인가요?",
                    a: "목동임페리얼학원의 월 교습비는 중등 수학 300,000원, 중등 영어 300,000원, 고등 수학 400,000원, 고등 영어 400,000원, 고등 국어 220,000원, 고등 과학 170,000원입니다. 특강료는 별도로 산정되며, 교재비는 교습비에 포함되지 않습니다. 교습과정별 전체 금액은 교습비 안내의 '학원 교습비 등 게시표'에서 확인하실 수 있습니다."
                },
                {
                    q: "수강료 납부일과 결제 방법은 어떻게 되나요?",
                    a: "목동임페리얼학원의 수강료 납부일은 매월 1일입니다. 결제톡 발송, 학원 현장 카드 결제, 유선상 카드 결제 중 편하신 방법을 선택하실 수 있습니다."
                },
                {
                    q: "중도 퇴원 시 환불 규정은 어떻게 되나요?",
                    a: "「학원의 설립·운영 및 과외교습에 관한 법률 시행령」 제18조 제3항에 따라 적법하게 처리해 드립니다. 교습 시작 전에는 이미 납부한 교습비 등의 전액을, 교습 시작 후 총 교습시간의 1/3 경과 전까지는 2/3에 해당하는 금액을, 1/3 경과 후부터 1/2 경과 전까지는 1/2에 해당하는 금액을 환불해 드리며, 총 교습시간의 1/2이 경과한 후에는 환불 금액이 없습니다."
                },
                {
                    q: "형제자매 할인이나 장학 제도가 있나요?",
                    a: "형제자매 할인은 운영하지 않으며, 영어와 수학을 동시에 수강하시는 경우 영어 수강료를 20,000원 할인해 드립니다. 그 외 과목은 단과 강의로 운영되어 추가 할인은 없습니다."
                }
            ]
        },
        {
            category: "학원 이용 안내",
            icon: "fa-building",
            items: [
                {
                    q: "등촌역에서 목동임페리얼학원까지 어떻게 가나요?",
                    a: "목동임페리얼학원은 서울 지하철 9호선 등촌역 6번 출구에서 445m 떨어져 있으며, 도보로 약 6분 걸립니다. 주소는 서울특별시 양천구 등촌로 192, 4층(우편번호 07950)이며 건물 지하 주차장도 이용하실 수 있습니다."
                },
                {
                    q: "셔틀버스를 운행하나요?",
                    a: "목동임페리얼학원은 셔틀버스를 운행하지 않습니다. 학원은 서울 지하철 9호선 등촌역 6번 출구에서 445m, 도보 약 6분 거리(서울특별시 양천구 등촌로 192, 4층)에 있어 도보 또는 대중교통으로 등원합니다."
                },
                {
                    q: "주차가 가능한가요?",
                    a: "목동임페리얼학원이 있는 건물 지하에 주차장이 있어 상담이나 방문 시 이용하실 수 있습니다."
                }
            ]
        }
    ],
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

const IS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';

if (IS_BROWSER) {
    document.addEventListener('DOMContentLoaded', () => {
        // 빌드 타임(scripts/prerender.mjs)에 이미 동일한 HTML을 심어 두었으면 첫 화면은
        // 다시 그리지 않습니다. 사용자가 필터를 조작하면 아래 함수들이 정상적으로 재렌더링합니다.
        const prerendered = document.documentElement.hasAttribute('data-prerendered');

        if (!prerendered) {
            renderSuccessStories();
            filterTeachers('all');
            renderTimetable();
            renderTuition();
            renderFAQ();
        }

        initTeacherFilter();
        initCounters();
    });

    // 화면 폭이 바뀌면 열려 있는 FAQ 답변의 높이를 다시 계산합니다.
    window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-answer.open').forEach(answer => {
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        });
    });
}

// 3. HTML 빌더 (DOM에 의존하지 않는 순수 함수)
//    브라우저 렌더링과 scripts/prerender.js(빌드 타임 정적 삽입)가 이 함수들을 함께
//    사용합니다. 덕분에 자바스크립트를 실행하지 않는 검색·AI 크롤러도 사용자와 완전히
//    동일한 내용을 읽게 됩니다. 데이터 원본은 언제나 위의 IMPERIAL_DATA 하나입니다.

function buildSuccessStoriesHTML(stories) {
    return stories
        .map(story => `<li><i class="fas fa-check text-imperial-blue mr-2 text-xs" aria-hidden="true"></i>${story}</li>`)
        .join('');
}

function buildTuitionCardsHTML(summary) {
    return summary.map(item => `
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-imperial-blue transition-colors flex justify-between items-center group">
                    <span class="font-bold text-gray-700 group-hover:text-imperial-blue text-lg">${item.title}</span>
                    <span class="font-black text-xl text-gray-900">${item.price}<span class="text-sm font-normal text-gray-500 ml-1">원</span></span>
                </div>
            `).join('');
}

function buildLegalTuitionRowsHTML(list) {
    return list.map(item => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.category}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">${item.subject}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">${item.capacity}명</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">${item.time}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">${item.price}</td>
            </tr>
        `).join('');
}

function buildTeacherCardsHTML(teachers) {
    return teachers.map(t => {
        const isTA = t.subject === 'TA';
        const nameDisplay = isTA
            ? `${t.name} <span class="text-sm font-normal text-gray-500">TA</span>`
            : `${t.name} <span class="text-sm font-normal text-gray-500">선생님</span>`;

        return `
            <div class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1" onclick="openTeacherModal(${t.id})">
                <div class="relative w-full aspect-square overflow-hidden bg-gray-200">
                    <img src="${(t.imgs && t.imgs.length > 0) ? t.imgs[0] : DEFAULT_PROFILE_IMG}" alt="목동임페리얼학원 ${t.subject} ${isTA ? '조교' : '강사'} ${t.name} - ${t.role}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='${DEFAULT_PROFILE_IMG}'">
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
                        자세히 보기 <i class="fas fa-chevron-right text-xs opacity-50" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function buildFAQHTML(groups) {
    let itemIndex = 0;

    return groups.map(group => {
        const items = group.items.map(item => {
            const answerId = `faq-answer-${itemIndex++}`;
            return `
                <div class="border-b border-gray-100 last:border-b-0">
                    <button type="button" onclick="toggleFAQ(this, '${answerId}')" aria-expanded="false" aria-controls="${answerId}" class="w-full flex items-start gap-3 md:gap-4 text-left py-5 group">
                        <span class="text-imperial-blue font-black text-lg leading-7 flex-shrink-0" aria-hidden="true">Q</span>
                        <span class="flex-1 font-bold text-gray-900 leading-7 group-hover:text-imperial-blue transition-colors keep-all">${item.q}</span>
                        <i class="fas fa-chevron-down text-gray-400 text-sm mt-2 flex-shrink-0 transition-transform duration-300" aria-hidden="true"></i>
                    </button>
                    <div id="${answerId}" class="faq-answer">
                        <div class="flex items-start gap-3 md:gap-4 pb-6 md:pr-8">
                            <span class="text-gray-300 font-black text-lg leading-7 flex-shrink-0" aria-hidden="true">A</span>
                            <p class="flex-1 text-gray-600 text-sm md:text-base leading-relaxed keep-all">${item.a}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="flex items-center gap-3 px-6 md:px-8 py-4 bg-gray-50 border-b border-gray-100">
                    <div class="w-9 h-9 rounded-lg bg-imperial-black text-white flex items-center justify-center text-sm flex-shrink-0" aria-hidden="true">
                        <i class="fas ${group.icon}"></i>
                    </div>
                    <h3 class="font-bold text-gray-900">${group.category}</h3>
                </div>
                <div class="px-6 md:px-8">${items}</div>
            </div>
        `;
    }).join('');
}

function buildTeacherOptionsHTML(teachers) {
    const names = [...new Set(teachers.filter(t => t.subject !== 'TA').map(t => t.name))];
    return names.map(name => `<option value="${name}">${name} T</option>`).join('');
}

function teacherBadgeHTML(name, teachers) {
    const teacherObj = teachers.find(t => t.name === name);
    return teacherObj
        ? `<button onclick="openTeacherModal(${teacherObj.id})" class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold hover:bg-imperial-blue hover:text-white transition-colors cursor-pointer">${name} T</button>`
        : `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">${name} T</span>`;
}

function buildTimetableRowsHTML(classes, teachers) {
    return classes.map(c => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-bold text-gray-900">${c.grade}</div>
                        <div class="text-xs text-gray-500">${c.subject}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-bold text-imperial-blue">${c.title}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900"><i class="far fa-calendar mr-1 text-gray-400" aria-hidden="true"></i> ${c.day}</div>
                        <div class="text-xs text-gray-500"><i class="far fa-clock mr-1 text-gray-400" aria-hidden="true"></i> ${c.time}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        ${teacherBadgeHTML(c.teacher, teachers)}
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
            `).join('');
}

function buildTimetableCardsHTML(classes, teachers) {
    return classes.map(c => `
                    <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded mb-1">${c.grade} | ${c.subject}</span>
                                <h3 class="text-lg font-bold text-imperial-blue">${c.title}</h3>
                            </div>
                            ${teacherBadgeHTML(c.teacher, teachers)}
                        </div>
                        <div class="flex flex-col gap-1 text-sm text-gray-600">
                            <div><i class="far fa-calendar w-5 text-center mr-1 text-gray-400" aria-hidden="true"></i> ${c.day}</div>
                            <div><i class="far fa-clock w-5 text-center mr-1 text-gray-400" aria-hidden="true"></i> ${c.time}</div>
                        </div>
                        <div class="flex justify-between items-center mt-2 pt-3 border-t border-gray-50">
                            <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">접수중</span>
                            <button onclick="openConsultModal('${c.title}')" class="text-sm font-bold bg-imperial-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                                신청하기
                            </button>
                        </div>
                    </div>
                `).join('');
}

// 4. DOM 렌더러 (위 빌더가 만든 HTML을 실제 컨테이너에 주입)

function renderTuition() {
    const container = document.getElementById('tuition-container');
    const policyText = document.getElementById('tuition-policy');

    if (policyText) policyText.innerHTML = DB.tuition.policy;
    if (container) container.innerHTML = buildTuitionCardsHTML(DB.tuition.summary);
}

function renderFAQ() {
    const container = document.getElementById('faq-container');
    if (container) container.innerHTML = buildFAQHTML(DB.faq);
}

function toggleFAQ(btn, answerId) {
    const answer = document.getElementById(answerId);
    const icon = btn.querySelector('i');
    if (!answer) return;

    if (answer.classList.contains('open')) {
        answer.classList.remove('open');
        answer.style.maxHeight = null;
        icon.classList.remove('rotate-180', 'text-imperial-blue');
    } else {
        answer.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        icon.classList.add('rotate-180', 'text-imperial-blue');
    }
}


function renderSuccessStories() {
    for (const [subject, stories] of Object.entries(DB.successStories)) {
        const list = document.getElementById(`success-${subject}`);
        if (list) list.innerHTML = buildSuccessStoriesHTML(stories);
    }
}

function filterTeachers(filter, btn) {
    const container = document.getElementById('teacher-container');
    if (!container) return;

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

    container.innerHTML = buildTeacherCardsHTML(filtered);
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
    if (!select || select.options.length > 1) return; // 프리렌더로 이미 채워져 있으면 건너뜀

    select.insertAdjacentHTML('beforeend', buildTeacherOptionsHTML(DB.teachers));
}

function renderTimetable() {
    const gradeVal = document.getElementById('grade-filter').value;
    const subjectVal = document.getElementById('subject-filter').value;
    const teacherVal = document.getElementById('teacher-filter').value;

    const filtered = DB.classes.filter(c => {
        const gradeMatch = gradeVal === 'all' || c.grade === gradeVal;
        const subjectMatch = subjectVal === 'all' || c.subject === subjectVal;
        const teacherMatch = teacherVal === 'all' || c.teacher === teacherVal;
        return gradeMatch && subjectMatch && teacherMatch;
    });

    const tbody = document.getElementById('timetable-body');
    const mobileContainer = document.getElementById('mobile-timetable-container');
    const noData = document.getElementById('no-classes');

    if (tbody) tbody.innerHTML = buildTimetableRowsHTML(filtered, DB.teachers);
    if (mobileContainer) mobileContainer.innerHTML = buildTimetableCardsHTML(filtered, DB.teachers);
    if (noData) noData.classList.toggle('hidden', filtered.length > 0);
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
            text: "전송에 실패했습니다. 잠시 후 다시 시도하시거나 02-2644-1178로 연락 주세요.",
            duration: 4000,
            gravity: "top", 
            position: "center", 
            style: { background: "#ff5f5f" }
        }).showToast();
    }
}

// 상담 신청 전송 — 봇 토큰은 서버(Cloudflare Pages Functions)에만 두고,
// 브라우저는 같은 도메인의 /api/consult 로만 보냅니다. (functions/api/consult.js)
async function sendTelegramAlert(data) {
    const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        let detail = '';
        try { detail = (await response.json()).error || ''; } catch (e) { /* 본문 없음 */ }
        throw new Error(`상담 신청 전송 실패 (${response.status}${detail ? ' ' + detail : ''})`);
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
// 6. 빌드 스크립트(Node)용 export — 브라우저에는 module이 없으므로 건너뜁니다.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IMPERIAL_DATA,
        buildSuccessStoriesHTML,
        buildTuitionCardsHTML,
        buildLegalTuitionRowsHTML,
        buildTeacherCardsHTML,
        buildFAQHTML,
        buildTimetableRowsHTML,
        buildTimetableCardsHTML,
        buildTeacherOptionsHTML
    };
}
