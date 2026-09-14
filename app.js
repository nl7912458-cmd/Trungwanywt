let currentDocId = null;

/* ===== Giao diện Đa Nhiệm (Task Switcher kiểu Android) ===== */
function openTaskSwitcher(groupId) {
    const group = KHO_DU_LIEU.docGroups && KHO_DU_LIEU.docGroups[groupId];
    if (!group || !group.length) {
        // Không có nhóm tài liệu -> quay về hành vi cũ (mở thẳng modal xác minh)
        openModal(groupId);
        return;
    }

    const track = document.getElementById('ts-track');
    track.innerHTML = '';

    group.forEach((doc) => {
        const card = document.createElement('div');
        card.className = 'ts-card';
        card.style.background = `linear-gradient(160deg, ${doc.color}, ${doc.color}cc)`;
        card.innerHTML = `
            <div class="ts-card-icon">文</div>
            <h4>${doc.title}</h4>
            <p>${doc.subtitle}</p>
        `;
        // Chạm vào thẻ -> đóng đa nhiệm, chuyển sang luồng xác minh Shopee cho đúng tài liệu đó
        card.onclick = () => {
            closeTaskSwitcher();
            openModal(doc.id);
        };
        track.appendChild(card);
    });

    const switcher = document.getElementById('task-switcher');
    switcher.classList.add('open');

    // Theo dõi cuộn để phóng to thẻ đang ở giữa, thu nhỏ các thẻ hai bên (hiệu ứng Recents)
    updateActiveCard();
    track.addEventListener('scroll', updateActiveCard);

    // Canh thẻ đầu tiên vào giữa sau khi lớp phủ hiện ra
    requestAnimationFrame(() => {
        const first = track.querySelector('.ts-card');
        if (first) first.scrollIntoView({ inline: 'center', block: 'nearest' });
    });
}

function closeTaskSwitcher() {
    const switcher = document.getElementById('task-switcher');
    switcher.classList.remove('open');
    const track = document.getElementById('ts-track');
    track.removeEventListener('scroll', updateActiveCard);
}

function updateActiveCard() {
    const track = document.getElementById('ts-track');
    if (!track) return;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closestCard = null;
    let closestDistance = Infinity;

    track.querySelectorAll('.ts-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        card.classList.remove('active');
        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });

    if (closestCard) closestCard.classList.add('active');
}

function openModal(docId) {
    currentDocId = docId;
    document.getElementById('quiz-modal').style.display = 'flex';
    document.getElementById('error-msg').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    loadRandomQuestion();
}

function closeModal() {
    document.getElementById('quiz-modal').style.display = 'none';
}

function showQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
}

function loadRandomQuestion() {
    const pool = KHO_DU_LIEU.shopeePool;
    const fakePool = KHO_DU_LIEU.fakeAnswers;
    
    // Bốc ngẫu nhiên 1 link shopee
    const randomIndex = Math.floor(Math.random() * pool.length);
    const currentQuiz = pool[randomIndex];
    document.getElementById('shopee-link').href = currentQuiz.link;
    
    const correctName = currentQuiz.correctName;
    
    // Lọc ngẫu nhiên 5 đáp án giả (loại trừ đáp án đúng nếu lỡ trùng tên)
    let fakes = [...fakePool].filter(item => item !== correctName).sort(() => 0.5 - Math.random()).slice(0, 5);
    
    // Gộp 1 đúng + 5 giả rồi xáo trộn vị trí
    let allOptions = [correctName, ...fakes].sort(() => 0.5 - Math.random());
    
    // Gán nhãn A, B, C, D, E, F
    const labels = ["A", "B", "C", "D", "E", "F"];
    let questionHTML = "<b>2. Sản phẩm trong link bạn vừa xem là gì?</b><br><br>";
    let correctLetter = "";
    
    allOptions.forEach((opt, index) => {
        questionHTML += `${labels[index]}. ${opt}<br>`;
        if (opt === correctName) {
            correctLetter = labels[index]; // Lưu lại đáp án đúng nằm ở chữ cái nào
        }
    });
    
    document.getElementById('quiz-question').innerHTML = questionHTML;
    
    // Tạo 6 nút bấm
    const optionsGrid = document.getElementById('quiz-options');
    optionsGrid.innerHTML = ''; 
    labels.forEach(letter => {
        let btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerText = letter;
        btn.onclick = () => checkAnswer(letter, correctLetter);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        const encodedLink = KHO_DU_LIEU.driveLinks[currentDocId];
        if (encodedLink) {
            window.location.href = atob(encodedLink); 
        } else {
            alert("Lỗi: Không tìm thấy link tài liệu!");
        }
    } else {
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.display = 'block';
        setTimeout(() => {
            errorMsg.style.display = 'none';
            // Ép ẩn câu hỏi lại từ đầu để bắt click link mới
            document.getElementById('quiz-container').style.display = 'none';
            loadRandomQuestion(); 
        }, 2000);
    }
}
