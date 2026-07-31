// ============================================================
//   ДОПОЛНИТЕЛЬНАЯ АНИМАЦИЯ (если нужно)
// ============================================================

// Все анимации уже сделаны через CSS, но можно добавить
// эффект при нажатии на кнопку (на случай, если пользователь не ждёт ховера)

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Если кнопка уже активна — ничего не делаем
        if (this.classList.contains('active')) return;

        // Убираем активность у всех кнопок
        document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));

        // Добавляем активность текущей
        this.classList.add('active');

        // Имитация заливки (на случай, если :hover не сработал на тач-устройствах)
        this.style.setProperty('--fill-width', '100%');

        // Через 2 секунды снимаем активность
        setTimeout(() => {
            this.classList.remove('active');
        }, 2000);
    });
});

// Плавная прокрутка (если будет несколько страниц)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('🚀 PLATTERS — рофл-сайт загружен!');