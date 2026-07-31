// Аккордеон с плюсиками
function toggleTariff(btn) {
    const card = btn.parentElement;
    const detail = card.querySelector('.tariff-detail');
    btn.classList.toggle('active');
    detail.classList.toggle('open');
}

// Конструктор (правильный расчёт цены)
function updateConstructor() {
    const gb = parseInt(document.getElementById('gbSlider').value);
    const min = parseInt(document.getElementById('minSlider').value);
    const sms = parseInt(document.getElementById('smsSlider').value);
    
    document.getElementById('gbVal').textContent = gb;
    document.getElementById('minVal').textContent = min;
    document.getElementById('smsVal').textContent = sms;
    
    // Формула расчёта
    let price = 50; // базовая стоимость
    price += gb * 5;      // 5 ₽ за ГБ
    price += min * 0.3;   // 0.3 ₽ за минуту
    price += sms * 0.5;   // 0.5 ₽ за СМС
    
    // Если есть галочки — добавляем бонусы
    const bonuses = document.querySelectorAll('.constructor-bonuses input[type="checkbox"]:checked');
    price += bonuses.length * 20; // 20 ₽ за каждый безлимитный пакет
    
    // Если цена больше 590 — ставим 590
    if (price > 590) {
        price = 590;
    }
    
    document.getElementById('constructorPrice').textContent = Math.round(price);
}

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', function() {
    updateConstructor();
});