console.log('=== НАЧАЛО СКРИПТА ===');

// Инициализация данных для графиков
const primaryColor = '#2c5530';
const primaryLight = 'rgba(44, 85, 48, 0.1)';
const years = [2023, 2024, 2025, 2026, 2027, 2028];

// График общей численности детей
new Chart(document.getElementById('totalChildrenChart'), {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Общая численность детей (0-17 лет)',
            data: [3706, 3597, 3525, 3432, 3334, 3226],
            borderColor: primaryColor,
            backgroundColor: primaryLight,
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                onClick: function(e, legendItem, legend) {
                    const index = legendItem.datasetIndex;
                    const ci = this.chart;
                    ci.data.datasets[index].hidden = ci.data.datasets[index].hidden ? false : true;
                    ci.update();

                    ym(105524102, 'reachGoal', '501358321');
                    console.log('Клик на легенду графика');
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString('ru-RU')} детей`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Численность детей'
                },
                min: 3000,
                max: 3800
            },
            x: {
                title: {
                    display: true,
                    text: 'Год'
                },
                ticks: {
                    callback: function(value, index, values) {
                        if (this.getLabelForValue(value) === '2025') {
                            return '2025*';
                        }
                        return this.getLabelForValue(value);
                    }
                }
            }
        }
    }
});

// График доли детского населения
new Chart(document.getElementById('childrenShareChart'), {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Доля детей 0-17 лет в общем населении',
            data: [17.4, 17.0, 16.7, 16.3, 15.8, 15.3],
            borderColor: primaryColor,
            backgroundColor: primaryLight,
            borderWidth: 3,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: primaryColor,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                onClick: function(e, legendItem, legend) {
                    const index = legendItem.datasetIndex;
                    const ci = this.chart;
                    ci.data.datasets[index].hidden = ci.data.datasets[index].hidden ? false : true;
                    ci.update();

                    ym(105524102, 'reachGoal', '501358321');
                    console.log('Клик на легенду графика');
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Доля детей (%)'
                },
                min: 14.5,
                max: 18,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Год'
                },
                ticks: {
                    callback: function(value, index, values) {
                        if (this.getLabelForValue(value) === '2025') {
                            return '2025*';
                        }
                        return this.getLabelForValue(value);
                    }
                }
            }
        }
    }
});

// График возрастных групп
new Chart(document.getElementById('ageGroupsChart'), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            {
                label: 'До 3 лет',
                data: [277, 236, 245, 257, 259, 258],
                backgroundColor: primaryColor
            },
            {
                label: '3-7 лет',
                data: [958, 876, 778, 671, 586, 512],
                backgroundColor: '#4a7c59'
            },
            {
                label: '7-17 лет',
                data: [2471, 2485, 2502, 2504, 2489, 2456],
                backgroundColor: '#6b9578'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                onClick: function(e, legendItem, legend) {
                    const index = legendItem.datasetIndex;
                    const ci = this.chart;
                    ci.data.datasets[index].hidden = ci.data.datasets[index].hidden ? false : true;
                    ci.update();
                    
                    ym(105524102, 'reachGoal', '501358321');
                    console.log('Клик на легенду графика');
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y} детей`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: false,
                title: {
                    display: true,
                    text: 'Год'
                },
                ticks: {
                    callback: function(value, index, values) {
                        if (this.getLabelForValue(value) === '2025') {
                            return '2025*';
                        }
                        return this.getLabelForValue(value);
                    }
                }
            },
            y: {
                stacked: false,
                title: {
                    display: true,
                    text: 'Численность детей'
                },
                beginAtZero: true
            }
        }
    }
});

// График детального распределения по возрастам
const ageLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

const data2023 = [73, 77, 127, 170, 178, 194, 191, 225, 225, 245, 232, 278, 219, 206, 222, 208, 207, 204];
const data2025 = [85, 83, 77, 82, 134, 178, 184, 200, 233, 234, 252, 238, 285, 240, 285, 222, 207, 222];
const data2028 = [83, 85, 90, 92, 94, 88, 94, 144, 189, 196, 214, 210, 245, 244, 260, 243, 288, 223];

// Функции для поиска максимальных и минимальных значений
const getMaxIndex = (arr) => arr.indexOf(Math.max(...arr));
const getMinIndex = (arr) => arr.indexOf(Math.min(...arr));

const max2023 = getMaxIndex(data2023);
const min2023 = getMinIndex(data2023);
const max2025 = getMaxIndex(data2025);
const min2025 = getMinIndex(data2025);
const max2028 = getMaxIndex(data2028);
const min2028 = getMinIndex(data2028);

// Создание графика детального распределения возрастов
const detailedCtx = document.getElementById('detailedAgesChart').getContext('2d');
const detailedChart = new Chart(detailedCtx, {
    type: 'line',
    data: {
        labels: ageLabels,
        datasets: [
            {
                label: '2023',
                data: data2023,
                borderColor: '#ff9e4a',
                backgroundColor: 'rgba(255, 158, 74, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: false,
                pointBackgroundColor: data2023.map((value, index) => {
                    if (index === max2023 || index === min2023) return '#ff9e4a';
                    return '#ff9e4a';
                }),
                pointBorderColor: data2023.map((value, index) => {
                    if (index === max2023 || index === min2023) return '#ff9e4a';
                    return '#ff9e4a';
                }),
                pointRadius: data2023.map((value, index) => {
                    if (index === max2023 || index === min2023) return 7;
                    return 3;
                }),
                pointHoverRadius: data2023.map((value, index) => {
                    if (index === max2023 || index === min2023) return 9;
                    return 5;
                }),
                pointBorderWidth: data2023.map((value, index) => {
                    if (index === max2023 || index === min2023) return 2;
                    return 1;
                })
            },
            {
                label: '2025',
                data: data2025,
                borderColor: '#6b9578',
                backgroundColor: 'rgba(107, 149, 120, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: false,
                pointBackgroundColor: data2025.map((value, index) => {
                    if (index === max2025 || index === min2025) return '#6b9578';
                    return '#6b9578';
                }),
                pointBorderColor: data2025.map((value, index) => {
                    if (index === max2025 || index === min2025) return '#6b9578';
                    return '#6b9578';
                }),
                pointRadius: data2025.map((value, index) => {
                    if (index === max2025 || index === min2025) return 7;
                    return 3;
                }),
                pointHoverRadius: data2025.map((value, index) => {
                    if (index === max2025 || index === min2025) return 9;
                    return 5;
                }),
                pointBorderWidth: data2025.map((value, index) => {
                    if (index === max2025 || index === min2025) return 2;
                    return 1;
                })
            },
            {
                label: '2028',
                data: data2028,
                borderColor: '#999999',
                backgroundColor: 'rgba(153, 153, 153, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: false,
                borderDash: [5, 5],
                pointBackgroundColor: data2028.map((value, index) => {
                    if (index === max2028 || index === min2028) return '#999999';
                    return '#999999';
                }),
                pointBorderColor: data2028.map((value, index) => {
                    if (index === max2028 || index === min2028) return '#999999';
                    return '#999999';
                }),
                pointRadius: data2028.map((value, index) => {
                    if (index === max2028 || index === min2028) return 7;
                    return 3;
                }),
                pointHoverRadius: data2028.map((value, index) => {
                    if (index === max2028 || index === min2028) return 9;
                    return 5;
                }),
                pointBorderWidth: data2028.map((value, index) => {
                    if (index === max2028 || index === min2028) return 2;
                    return 1;
                })
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                onClick: function(e, legendItem, legend) {
                    const index = legendItem.datasetIndex;
                    const ci = this.chart;
                    ci.data.datasets[index].hidden = ci.data.datasets[index].hidden ? false : true;
                    ci.update();

                    ym(105524102, 'reachGoal', '501358321');
                    console.log('Клик на легенду графика');
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label;
                        const value = context.parsed.y;
                        const index = context.dataIndex;
                        const year = label;

                        let extraInfo = '';
                        if (year === '2023') {
                            if (index === max2023) extraInfo = ' (самый многочисленный)';
                            if (index === min2023) extraInfo = ' (самый малочисленный)';
                        } else if (year === '2025') {
                            if (index === max2025) extraInfo = ' (самый многочисленный)';
                            if (index === min2025) extraInfo = ' (самый малочисленный)';
                        } else if (year === '2028') {
                            if (index === max2028) extraInfo = ' (самый многочисленный)';
                            if (index === min2028) extraInfo = ' (самый малочисленный)';
                        }

                        return `${label}: ${value} детей${extraInfo}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Численность детей'
                },
                min: 50,
                max: 300,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Возраст (количество лет)'
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 10,
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        }
    }
});

// Функция для подсветки экстремальных точек на графике
function addHoverEffects() {
    const canvas = document.getElementById('detailedAgesChart');
    const extremePoints = [
        { year: '2023', index: max2023, color: '#ff9e4a' },
        { year: '2023', index: min2023, color: '#ff9e4a' },
        { year: '2025', index: max2025, color: '#6b9578' },
        { year: '2025', index: min2025, color: '#6b9578' },
        { year: '2028', index: max2028, color: '#999999' },
        { year: '2028', index: min2028, color: '#999999' }
    ];

    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const points = detailedChart.getElementsAtEventForMode(
            event, 'nearest', { intersect: true }, true
        );

        if (points.length) {
            const point = points[0];
            const datasetIndex = point.datasetIndex;
            const index = point.index;

            const isExtreme = extremePoints.some(p => {
                const yearMap = { '2023': 0, '2025': 1, '2028': 2 };
                return datasetIndex === yearMap[p.year] && index === p.index;
            });

            if (isExtreme) {
                canvas.style.cursor = 'pointer';
            } else {
                canvas.style.cursor = 'default';
            }
        } else {
            canvas.style.cursor = 'default';
        }
    });
}

// Отслеживание просмотренных разделов
function trackViewedSections() {
    const sections = {
        'home': false,
        'trends': false,
        'total': false,
        'age': false,
        'kindergartens': false,
        'schools': false,
        'faq': false
    };
    
    const sectionIds = Object.keys(sections);
    let viewedCount = 0;
    
    sectionIds.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !sections[sectionId]) {
                    sections[sectionId] = true;
                    viewedCount++;
                    
                    // Проверяем достижение целей
                    if (viewedCount === 3) {
                        ym(105524102, 'reachGoal', '501358573');
                        console.log('Цель достигнута: Просмотр 3+ разделов');
                    }
                    
                    if (viewedCount === 5) {
                        ym(105524102, 'reachGoal', '501358588');
                        console.log('Цель достигнута: Просмотр 5+ разделов');
                    }
                }
            });
        }, { threshold: 0.3 }); // 30% видимости
        
        observer.observe(element);
    });
}

// Запуск эффектов наведения с задержкой
setTimeout(addHoverEffects, 1000);

// Виртуальные PAGEVIEWS для Я.МЕТРИКИ
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        const anchor = url.split('#')[1] || 'home';
        
        // Отправляем виртуальный просмотр страницы
        ym(105524102, 'hit', '/#' + anchor);
        
        console.log('Метрика: Виртуальный pageview -', anchor);
    }
}).observe(document, {subtree: true, childList: true});

// Плавная прокрутка по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Закрываем мобильное меню после клика
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
});

// Прокрутка по клику на стрелку в герой-секции
document.querySelector('.arrow-circle').addEventListener('click', function() {
    const target = document.querySelector('#trends');
    const offset = 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// Функция для определения цвета по проценту заполнения
function getColorForPercentage(percent) {
    if (percent === 0) return '#e57373';
    if (percent >= 80) return '#6b9578';
    if (percent >= 50) return '#ff9e4a';
    return '#e57373';
}

// Инициализация прогресс-баров детских садов
function initializeKindergartenProgress() {
    const yearRows = document.querySelectorAll('.year-row');

    yearRows.forEach(row => {
        const percent = parseInt(row.getAttribute('data-percent'));
        const color = getColorForPercentage(percent);

        const progressFill = row.querySelector('.progress-fill');
        const progressValue = row.querySelector('.progress-value');

        if (progressFill) {
            progressFill.style.backgroundColor = color;
            if (percent > 0) {
                progressFill.style.width = percent + '%';
                progressFill.style.minWidth = '4px';
            } else {
                progressFill.style.width = '0%';
                progressFill.style.backgroundColor = 'transparent';
            }
        }

        if (progressValue) {
            progressValue.style.color = color;
        }
    });
}

// Отслеживание открытия деталей детских садов
function setupKindergartenTracking() {
    const checkboxes = document.querySelectorAll('.details-toggle');
        
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                ym(105524102, 'reachGoal', '501358286');
                console.log('Детали сада открыты: KG' + (index + 1));
            }
        });
    });
}

// Функция адаптации блока Школы для мобильных устройств
function adaptSchoolsForMobile() {
    const isMobile = window.innerWidth <= 768;
    const desktopView = document.querySelector('.age-shift-container.desktop-only');
    const mobileView = document.querySelector('.mobile-only');

    if (desktopView && mobileView) {
        if (isMobile) {
            desktopView.style.display = 'none';
            mobileView.style.display = 'block';
        } else {
            desktopView.style.display = 'flex';
            mobileView.style.display = 'none';
        }
    }

    // Адаптация статистики для мобильных
    const schoolsStatsGrid = document.querySelector('.schools-stats-grid');
    if (schoolsStatsGrid && isMobile) {
        schoolsStatsGrid.style.gridTemplateColumns = '1fr';
    } else if (schoolsStatsGrid && !isMobile) {
        schoolsStatsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
}

// Управление мобильным меню
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        // Переключение меню по клику на бургер (после отправки цели через onclick)
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            console.log('Меню переключено:', mobileMenu.classList.contains('active'));
        });

        // Закрытие меню при клике на ссылку внутри него
        const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                console.log('Меню закрыто по клику на ссылку');
            });
        });

        // Закрытие меню при клике вне его (на пустую область)
        document.addEventListener('click', function(event) {
            // Проверяем, что клик был не по меню и не по кнопке
            if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
                console.log('Меню закрыто по клику вне его');
            }
        });
    } else {
        console.error('Не найдены элементы мобильного меню!');
    }
}

// Скрипт для работы аккордеона "Вопросы и ответы"
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Отправляем цель, если элемент открывается
            if (!item.classList.contains('active')) {
                ym(105524102, 'reachGoal', '501358319');
                console.log('FAQ открыт');
            }
            
            // Закрываем все открытые элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                }
            });

            // Открываем/закрываем текущий элемент
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.display = 'none';
            } else {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeKindergartenProgress();
    setupKindergartenTracking();
    adaptSchoolsForMobile();
    setupMobileMenu();
    setupFAQAccordion();

    // Цель: Визит более 30 секунд
    setTimeout(function() {
        ym(105524102, 'reachGoal', '501358884');
        console.log('Цель достигнута: Визит более 30 секунд');
    }, 30000); // 30000 миллисекунд = 30 секунд

    // Запускаем отслеживание разделов
    trackViewedSections();

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', adaptSchoolsForMobile);
});

// Структурированные данные для SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Наполняемость детских садов и школ Черноголовки 2023-2028",
    "description": "Статистика загрузки детских садов и школ Черноголовки: демографический анализ и прогнозы",
    "keywords": "Черноголовка, детские сады, школы, наполняемость, статистика, дошкольное образование, школьное образование, демография, тренды, анализ",
    "creator": {
        "@type": "Organization",
        "name": "Неофициальная визуализация данных"
    },
    "datePublished": "2025",
    "temporal": "2023-2028",
    "spatialCoverage": "Черноголовка, Московская область",
    "includedInDataCatalog": {
        "@type": "DataCatalog",
        "name": "Демография Черноголовки"
    }
};

// Добавление структурированных данных в head
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

// Проверка, что цели Я.Метрики работают
console.log('=== Яндекс.Метрика цели загружены ===');
console.log('=== ВНЕШНИЕ ССЫЛКИ ===');
console.log('Клик Telegram: 501358129');
console.log('Клик Email: 501358195');
console.log('Клик Постановление: 502773171');
console.log('Клик ЧСОШ: 501358230');
console.log('Клик Боково: 501358247');

console.log('=== КОНТЕНТ И ВОВЛЕЧЕНИЕ ===');
console.log('Детали сада: 501358286');
console.log('FAQ открыт: 501358319');
console.log('Легенда графика: 501358321');
console.log('Время на сайте >30 сек: 501358884');
console.log('Просмотр 3+ разделов: 501358573');
console.log('Просмотр 5+ разделов: 501358588');

console.log('=== НАВИГАЦИЯ ===');
console.log('Бургер: 501407922');
console.log('Стрелка вниз: 501406860');
console.log('Навигация (все пункты): 501406879');
console.log('Логотип: 501406888');

console.log('Для теста: ym(105524102, "reachGoal", "НАЗВАНИЕ_ЦЕЛИ")');
