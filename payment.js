document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const tariff = params.get('tariff');
    
    const tariffs = {
        light: { name: 'Лайт', price: 199 },
        optima: { name: 'Оптима', price: 299 },
        max: { name: 'Макс', price: 450 },
        custom: { name: 'Конструктор', price: 249 }
    };
    
    const data = tariffs[tariff] || tariffs.light;
    document.getElementById('tariffName').innerHTML = `Тариф "${data.name}" — <span>${data.price} ₽</span>`;
    document.getElementById('totalAmount').textContent = (data.price + 50) + ' ₽';
    document.getElementById('payAmount').textContent = (data.price + 50) + ' ₽';
});

function togglePayButton() {
    const agree = document.getElementById('agreeCheck').checked;
    document.getElementById('payButton').disabled = !agree;
}

function processPayment() {
    const params = new URLSearchParams(window.location.search);
    const tariff = params.get('tariff');
    
    const tariffs = {
    light: { name: 'Лайт', price: 199 },
    optima: { name: 'Оптима', price: 299 },
    max: { name: 'Макс', price: 450 },
    custom: { name: 'Конструктор', price: 249 },
    music: { name: 'Музыка ван лав', price: 250 },
    video: { name: 'Сериалы и кино', price: 250 },
    gaming: { name: 'Игры', price: 300 },
    grandparents: { name: 'Бабушки и дедушки', price: 450 },
    parents: { name: 'Родители', price: 450 },
    kids: { name: 'Дети', price: 470 },
    travel: { name: 'Хеллоу фром Раша!', price: 350 },
    perminute: { name: 'По минуте', price: 0 }
};
    
    const data = tariffs[tariff] || tariffs.light;
    
    const sim = {
        number: generatePhone(),
        balance: 200,
        tariff: { name: data.name, price: data.price }
    };
    saveData('pltrs_sim', sim);
    
    // Скрываем панель оплаты, показываем успех
    document.querySelector('.payment-overlay').style.display = 'none';
    document.getElementById('successPanel').style.display = 'flex';
}

function goToMain() {
    window.location.href = 'index.html';
}