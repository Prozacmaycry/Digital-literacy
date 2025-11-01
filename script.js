// script.js - полный JavaScript код для сайта

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    function toggleMenu() {
        const isActive = navLinks.classList.contains('active');
        
        mobileMenuBtn.classList.toggle('active', !isActive);
        navLinks.classList.toggle('active', !isActive);
        menuOverlay.classList.toggle('active', !isActive);
        
        // Блокируем скролл
        if (!isActive) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        } else {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    }

    function closeMenu() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }

    // Клик по бургеру
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Клик по оверлею
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Клик по ссылкам меню
    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Закрытие при ресайзе на десктоп
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});

// Изменение шапки при прокрутке
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Слайдер
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (sliderTrack && dots.length > 0) {
        let currentSlide = 0;
        const totalSlides = 3;

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Обновляем активную точку
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Автопереключение слайдов
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 10000);
    }
});

// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }
});

// Помощник для записи
document.addEventListener('DOMContentLoaded', function() {
    const assistantFab = document.querySelector('.assistant-fab');
    const assistantChat = document.querySelector('.assistant-chat');
    const closeChat = document.querySelector('.close-chat');
    const tgBtn = document.querySelector('.tg-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');

    if (assistantFab && assistantChat) {
        // Открыть/закрыть чат
        assistantFab.addEventListener('click', () => {
            assistantChat.classList.toggle('active');
        });

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                assistantChat.classList.remove('active');
            });
        }

        // Закрыть чат при клике вне его
        document.addEventListener('click', (e) => {
            if (!assistantChat.contains(e.target) && !assistantFab.contains(e.target)) {
                assistantChat.classList.remove('active');
            }
        });

        // Ссылки для мессенджеров
        if (tgBtn) {
            tgBtn.addEventListener('click', () => {
                window.open('https://t.me/@notserch', '_blank');
            });
        }

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                window.open('https://wa.me/77475509819', '_blank');
            });
        }

        // Авто-открытие через 10 секунд
        setTimeout(() => {
            if (!localStorage.getItem('assistantShown')) {
                assistantChat.classList.add('active');
                localStorage.setItem('assistantShown', 'true');
            }
        }, 10000);
    }
});

// Плавный скролл к якорям
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Обработка формы
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            
            // Валидация
            if (!name || !phone) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Здесь можно отправить данные на сервер
            console.log('Данные формы:', { name, phone });
            
            // Показываем сообщение об успехе
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            this.reset();
        });
    }
});

// Newsletter форма
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            
            // Здесь можно отправить email на сервер
            console.log('Email для рассылки:', email);
            
            alert('Спасибо за подписку!');
            this.reset();
        });
    }
});

// Дополнительные утилиты
// Предотвращение быстрых многократных кликов
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Адаптация изображений
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Добавляем lazy loading
        img.loading = 'lazy';
        
        // Добавляем alt если его нет
        if (!img.alt) {
            img.alt = 'Изображение';
        }
    });
}

document.addEventListener('DOMContentLoaded', optimizeImages);

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Изображение не загружено:', this.src);
        });
    });
});

// Сохранение позиции скролла при перезагрузке
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// Анимация хедера при скролле (улучшенная)
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', debounce(() => {
    if (header) {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Скролл вниз
            header.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }
}, 100));

// Инициализация всех функций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен и готов к работе!');
    
    // Добавляем класс для CSS анимаций после загрузки
    document.body.classList.add('loaded');
});