
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




// Инициализация всех функций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен и готов к работе!');
    
    // Добавляем класс для CSS анимаций после загрузки
    document.body.classList.add('loaded');
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

// ===== ЧИСТАЯ И АККУРАТНАЯ ОБРАБОТКА ЯКОРЕЙ =====

// Скролл с учетом высоты хедера
function scrollToAnchor(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

    window.scrollTo({ top, behavior: "smooth" });
}

// Переходы по якорям при клике
document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="#"], a[href*=".html#"]');
    if (!link) return;

    const href = link.getAttribute("href");

    // 1) Якорь на этой же странице
    if (href.startsWith("#")) {
        e.preventDefault();
        scrollToAnchor(href);
        return;
    }

    // 2) Переход на другую страницу с якорем
    if (href.includes(".html#")) {
        const [page, hash] = href.split("#");
        localStorage.setItem("pendingAnchor", "#" + hash);
        return; // браузер сам перейдёт на страницу
    }
});

// Переходы на нужный блок после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
    const hashFromURL = window.location.hash;
    const hashFromStorage = localStorage.getItem("pendingAnchor");

    const hash = hashFromURL || hashFromStorage;
    if (!hash) return;

    // Убираем сохранённый якорь (чтобы не прыгало при обновлении)
    localStorage.removeItem("pendingAnchor");

    // Прокручиваем мягко к нужному элементу
    setTimeout(() => {
        scrollToAnchor(hash);
    }, 50);
});
   document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    const levelSections = document.querySelectorAll('.level-section');
    const courseProgress = document.getElementById('course-progress');
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Переменные состояния
    let activeLevel = 1;
    let isFixed = false;
    let isMobile = window.innerWidth <= 768;
    const levelPositions = {};
    
    // Высота элементов
    const headerHeight = header ? header.offsetHeight : 80;
    const progressOffset = courseProgress.offsetTop;
    
    // Проверяем, открыто ли мобильное меню
    function isMobileMenuOpen() {
        return mobileMenuBtn && mobileMenuBtn.classList.contains('active');
    }
    
    // Определение устройства
    function checkDevice() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            initLevelPositions();
            updateActiveLevel();
        }
    }
    
    // Инициализация позиций уровней
    function initLevelPositions() {
        levelSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const offsetAdjustment = isMobile ? 30 : 50;
            const offsetTop = rect.top + scrollTop - headerHeight - offsetAdjustment;
            
            const id = section.id;
            const step = id === 'beginner-level' ? 1 : 
                        id === 'intermediate-level' ? 2 : 3;
            
            levelPositions[step] = offsetTop;
        });
        
        console.log('Level positions:', levelPositions);
    }
    
    // Обновление активного уровня
    function updateActiveLevel() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const triggerOffset = viewportHeight * (isMobile ? 0.15 : 0.2);
        
        // Определяем активный уровень
        let newActiveLevel = 1;
        
        if (levelPositions[3] && scrollPosition >= levelPositions[3] - triggerOffset) {
            newActiveLevel = 3;
        } else if (levelPositions[2] && scrollPosition >= levelPositions[2] - triggerOffset) {
            newActiveLevel = 2;
        }
        
        // Обновляем UI только если уровень изменился
        if (newActiveLevel !== activeLevel) {
            activeLevel = newActiveLevel;
            
            progressSteps.forEach(step => {
                const stepNumber = parseInt(step.getAttribute('data-step'));
                step.classList.toggle('active', stepNumber === activeLevel);
            });
            
            updateProgressLines();
        }
        
        // ВАЖНОЕ ИЗМЕНЕНИЕ: ФИКСИРУЕМ И НА МОБИЛЬНЫХ ТОЖЕ!
        const shouldBeFixed = scrollPosition > progressOffset;
        
        if (shouldBeFixed !== isFixed) {
            isFixed = shouldBeFixed;
            courseProgress.classList.toggle('fixed', shouldBeFixed);
            
            // На мобильных добавляем дополнительный отступ для открытого меню
            if (isMobile && isMobileMenuOpen()) {
                document.body.style.paddingTop = shouldBeFixed ? '140px' : '';
            }
        }
    }
    
    // Обновление линий прогресса
    function updateProgressLines() {
        progressLines.forEach(line => {
            line.classList.remove('active');
        });
        
        if (activeLevel >= 2) {
            const firstLine = document.querySelector('.progress-line:first-of-type');
            if (firstLine) firstLine.classList.add('active');
        }
        
        if (activeLevel >= 3) {
            const secondLine = document.querySelector('.progress-line:last-of-type');
            if (secondLine) secondLine.classList.add('active');
        }
    }
    
    // Скролл к выбранному уровню
    function scrollToLevel(step) {
        const targetId = step.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetAdjustment = isMobile ? headerHeight + 20 : headerHeight + 30;
            const offset = targetElement.offsetTop - offsetAdjustment;
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }
    
    // Адаптивная инициализация
    function init() {
        checkDevice();
        
        setTimeout(() => {
            initLevelPositions();
            updateActiveLevel();
            
            if (progressSteps.length > 0) {
                progressSteps[0].classList.add('active');
            }
            
            // Анимации для модулей
            const observerOptions = {
                threshold: isMobile ? 0.05 : 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.module-detail').forEach(module => {
                observer.observe(module);
            });
            
            console.log('Progress bar initialized');
        }, 100);
    }
    
    // Дебаунсинг для оптимизации
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveLevel, 50);
    });
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkDevice();
            initLevelPositions();
            updateActiveLevel();
        }, 150);
    });
    
    // Клик по шагам прогресса
    progressSteps.forEach(step => {
        step.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToLevel(this);
        });
    });
    
    // Обработка открытия/закрытия мобильного меню
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Обновляем позицию при открытии/закрытии меню
            setTimeout(() => {
                initLevelPositions();
                updateActiveLevel();
            }, 300);
        });
    }
    
    // Инициализация
    init();
    window.addEventListener('load', function() {
        setTimeout(init, 300);
    });
});