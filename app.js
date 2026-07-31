// ============================================================
//   ЧАТ С ПОДДЕРЖКОЙ (FETCH + CORS)
// ============================================================

const API_WORKER_URL = 'https://pltrs.stepanmolodyh7may.workers.dev';
let lastReplyCount = 0;

// ===== ОТПРАВКА =====
function sendMessage() {
    const text = document.getElementById('chatInput').value.trim();
    if (!text) return;

    const BOT_TOKEN = '8451595343:AAFmxxaI9ltHhDAf4DJZ9SsU84nLZhpnKFc';
    const ADMIN_CHAT_ID = 1904578260;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: ADMIN_CHAT_ID,
            text: '🆕 Сообщение с сайта PLTRS\n\n📝 ' + text,
            parse_mode: 'HTML'
        })
    })
    .then(() => {
        // Сообщение отправлено (ответ не читаем из-за no-cors)
        document.getElementById('chatInput').value = '';
        document.getElementById('chatStatus').textContent = '✅ Отправлено!';
        document.getElementById('chatStatus').style.color = 'green';
    })
    .catch(() => {
        document.getElementById('chatStatus').textContent = '❌ Ошибка отправки';
        document.getElementById('chatStatus').style.color = 'red';
    });
}

// ===== ПОЛУЧЕНИЕ ОТВЕТОВ (ОБЫЧНЫЙ FETCH) =====
function checkForReplies() {
    fetch(API_WORKER_URL + '/get_replies')
        .then(response => response.json())
        .then(data => {
            if (data.replies && data.replies.length > lastReplyCount) {
                const messages = document.getElementById('chatMessages');
                const status = document.getElementById('chatStatus');
                
                const newReplies = data.replies.slice(lastReplyCount);
                newReplies.forEach(reply => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-message bot';
                    botMsg.innerHTML = `
                        <span class="avatar">👨‍💻</span>
                        <span class="text">${escapeHtml(reply.text)}</span>
                    `;
                    messages.appendChild(botMsg);
                    messages.scrollTop = messages.scrollHeight;
                });
                
                lastReplyCount = data.replies.length;
                status.textContent = '✅ Поддержка ответила!';
                status.style.color = 'green';
            }
        })
        .catch((error) => {
            console.warn('Ошибка получения ответов:', error);
        })
        .finally(() => {
            setTimeout(checkForReplies, 3000);
        });
}

// ===== ЭКРАНИРОВАНИЕ =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', function() {
    checkForReplies();
    
    const input = document.getElementById('chatInput');
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});