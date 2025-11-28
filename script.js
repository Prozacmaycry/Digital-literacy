
// Мобильное меню - ИСПРАВЛЕННАЯ ВЕРСИЯ
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');
    
    // Создаем кнопку закрытия
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 25px;
        right: 25px;
        font-size: 2rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--primary-orange);
        z-index: 1001;
    `;
    
    // Вставляем кнопку закрытия в меню
    nav.insertBefore(closeBtn, nav.firstChild);

    function openMenu() {
        nav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }

    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Разблокируем скролл
    }

    // События
    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
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
// УНИВЕРСАЛЬНЫЙ ПОМОЩНИК ДЛЯ ВСЕХ СТРАНИЦ
document.addEventListener('DOMContentLoaded', function() {
    initializeAssistant();
});

function initializeAssistant() {
    const assistantFab = document.querySelector('.assistant-fab');
    const assistantChat = document.querySelector('.assistant-chat');
    
    if (!assistantFab || !assistantChat) return;
    
    const closeChat = document.querySelector('.close-chat');
    const tgBtn = document.querySelector('.tg-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');

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
            window.open('https://t.me/notserch', '_blank');
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

// Автоматическое заполнение формы при выборе тарифа
document.addEventListener('DOMContentLoaded', function() {
    initializePricingButtons();
});

function initializePricingButtons() {
    const pricingButtons = document.querySelectorAll('[data-plan]');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            
            // Сохраняем выбранный тариф в localStorage
            localStorage.setItem('selectedPlan', plan);
            localStorage.setItem('selectedPrice', price);
            
            console.log(`Выбран тариф: ${plan}, цена: ${price} тг`);
        });
    });
    
    // Автозаполнение формы при загрузке страницы с формой
    autoFillForm();
}





// Плавный скролл к якорям и обработка межстраничных переходов
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Если ссылка ведет на другую страницу с якорем (например: index.html#about)
            if (href.includes('.html#')) {
                // Сохраняем информацию о переходе
                const [page, hash] = href.split('#');
                if (page === window.location.pathname.split('/').pop() || page === '') {
                    // Текущая страница - обрабатываем как якорь
                    e.preventDefault();
                    const target = document.querySelector('#' + hash);
                    if (target) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Другая страница - позволяем браузеру обработать переход
                    // Якорь автоматически сработает при загрузке страницы
                }
            }
            // Если это якорь на текущей странице
            else if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Обработка якоря при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Ждем полной загрузки страницы
    setTimeout(() => {
        const hash = window.location.hash;
        if (hash && document.querySelector(hash)) {
            const target = document.querySelector(hash);
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
});

// EmailJS обработка формы signup-form
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация EmailJS
    emailjs.init("I57g_xcTJf_ttcC_n");
    
    const signupForm = document.getElementById('signup-form');
    
        if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Добавляем информацию о выбранном тарифе
            const selectedPlan = document.getElementById('selected-plan')?.value || 'Не выбран';
            const planField = document.createElement('input');
            planField.type = 'hidden';
            planField.name = 'selected_plan';
            planField.value = selectedPlan;
            this.appendChild(planField);
            
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.textContent;
            
            // Показываем состояние загрузки
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Находим или создаем элемент для сообщений
            let formMessage = document.getElementById('form-message');
            if (!formMessage) {
                formMessage = document.createElement('div');
                formMessage.id = 'form-message';
                formMessage.style.marginTop = '15px';
                this.appendChild(formMessage);
            }
            formMessage.style.display = 'none';
            
            // Добавляем дату отправки
            const currentDate = new Date().toLocaleString('ru-RU');
            const dateField = document.createElement('input');
            dateField.type = 'hidden';
            dateField.name = 'date';
            dateField.value = currentDate;
            this.appendChild(dateField);
            
            // Отправка формы через EmailJS
            emailjs.sendForm("Gmailcon", "template_vs9v9by", this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Успешная отправка
                    showFormMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                    this.reset();
                    
                    // Удаляем временное поле даты
                    if (dateField.parentNode) {
                        dateField.remove();
                    }
                    
                    // Возвращаем кнопку в исходное состояние
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                    
                }.bind(this), function(error) {
                    // Ошибка отправки
                    console.error('FAILED...', error);
                    showFormMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
                    
                    // Удаляем временное поле даты
                    if (dateField.parentNode) {
                        dateField.remove();
                    }
                    
                    // Возвращаем кнопку в исходное состояние
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            
            function showFormMessage(message, type) {
                formMessage.textContent = message;
                formMessage.style.display = 'block';
                formMessage.style.padding = '12px';
                formMessage.style.borderRadius = '5px';
                formMessage.style.textAlign = 'center';
                formMessage.style.marginTop = '15px';
                formMessage.style.fontSize = '14px';
                
                if (type === 'success') {
                    formMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                    formMessage.style.color = '#155724';
                    formMessage.style.border = '1px solid #c3e6cb';
                } else {
                    formMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                    formMessage.style.color = '#721c24';
                    formMessage.style.border = '1px solid #f5c6cb';
                }
                
                // Автоматически скрываем сообщение через 5 секунд
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// Newsletter форма (простая версия без EmailJS)
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


// Инициализация всех функций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен и готов к работе!');
    
    // Добавляем класс для CSS анимаций после загрузки
    document.body.classList.add('loaded');
});

// Обработка якорных ссылок при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли якорь в URL
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Прокручиваем к элементу
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Добавляем небольшой отступ от хедера
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollBy(0, -headerHeight - 20);
            }
        }, 100);
    }
});

// Функция для отправки в мессенджеры
function sendToMessenger(button) {
    const plan = button.getAttribute('data-plan');
    const message = `Здравствуйте! Хочу приобрести ${plan}. Пожалуйста, свяжитесь со мной для оформления.`;
    
    // Показываем выбор мессенджера
    showMessengerChoice(message, plan);
}

function showMessengerChoice(message, plan) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <h3 style="color: #2E5BFF; margin-bottom: 1rem;">Выберите способ связи</h3>
            <p style="margin-bottom: 1.5rem; color: #666;">Вы выбрали: <strong>${plan}</strong></p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button onclick="openTelegram('${message}')" style="
                    background: #0088cc;
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                ">
                    <i class="fab fa-telegram"></i>
                    Написать в Telegram
                </button>
                
                <button onclick="openWhatsApp('${message}')" style="
                    background: #25D366;
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                ">
                    <i class="fab fa-whatsapp"></i>
                    Написать в WhatsApp
                </button>
                
                <button onclick="closeModal()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    margin-top: 0.5rem;
                ">
                    Отмена
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Функции для открытия мессенджеров
function openTelegram(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/notserch?text=${encodedMessage}`, '_blank');
    closeModal();
}

function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/77475509819?text=${encodedMessage}`, '_blank');
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
