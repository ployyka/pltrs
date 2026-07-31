document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        if (item.classList.contains('open')) {
            const answer = item.querySelector('.faq-answer');
            const question = item.querySelector('.faq-question');
            if (answer) {
                answer.classList.add('open');
                if (question) question.classList.add('active');
            }
        }
    });

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function () {
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    otherAnswer.classList.remove('open');
                    otherQuestion.classList.remove('active');
                }
            });

            answer.classList.toggle('open');
            question.classList.toggle('active');
        });
    });
});

function toggleMenu() {
    const nav = document.querySelector('header nav');
    if (nav) nav.classList.toggle('open');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const nav = document.querySelector('header nav');
            if (nav) nav.classList.remove('open');
        }
    });
});