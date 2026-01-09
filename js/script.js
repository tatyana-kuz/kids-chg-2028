// Конфигурация
const CONFIG = {
    primaryColor: '#2c5530',
    primaryLight: 'rgba(44, 85, 48, 0.1)',
    years: [2023, 2024, 2025, 2026, 2027, 2028],
    ymId: 105524102
};

// Данные для графиков
const CHART_DATA = {
    totalChildren: [3706, 3597, 3525, 3432, 3334, 3226],
    childrenShare: [17.4, 17.0, 16.7, 16.3, 15.8, 15.3],
    ageGroups: {
        '0-3': [277, 236, 245, 257, 259, 258],
        '3-7': [958, 876, 778, 671, 586, 512],
        '7-17': [2471, 2485, 2502, 2504, 2489, 2456]
    },
    detailedAges: {
        2023: [73, 77, 127, 170, 178, 194, 191, 225, 225, 245, 232, 278, 219, 206, 222, 208, 207, 204],
        2025: [85, 83, 77, 82, 134, 178, 184, 200, 233, 234, 252, 238, 285, 240, 285, 222, 207, 222],
        2028: [83, 85, 90, 92, 94, 88, 94, 144, 189, 196, 214, 210, 245, 244, 260, 243, 288, 223]
    }
};

// Утилиты
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    trackGoal(goal) {
        if (typeof ym === 'function') {
            ym(CONFIG.ymId, 'reachGoal', goal);
        }
        console.log(`Цель: ${goal}`);
    },

    safeQuery(selector) {
        const element = document.querySelector(selector);
        if (!element) console.warn(`Элемент не найден: ${selector}`);
        return element;
    },

    getColorForPercentage(percent) {
        if (percent === 0) return '#e57373';
        if (percent >= 80) return '#6b9578';
        if (percent >= 50) return '#ff9e4a';
        return '#e57373';
    }
};

// Обработчики графиков
const chartHandlers = {
    createLegendHandler(chartName) {
        return function(e, legendItem) {
            const index = legendItem.datasetIndex;
            const ci = this.chart;
            ci.data.datasets[index].hidden = !ci.data.datasets[index].hidden;
            ci.update();
            utils.trackGoal('chart_legend_toggle');
        };
    },

    createTotalChildrenChart() {
        new Chart(document.getElementById('totalChildrenChart'), {
            type: 'line',
            data: {
                labels: CONFIG.years,
                datasets: [{
                    label: 'Общая численность детей (0-17 лет)',
                    data: CHART_DATA.totalChildren,
                    borderColor: CONFIG.primaryColor,
                    backgroundColor: CONFIG.primaryLight,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: this.getBaseOptions()
        });
    },

    createChildrenShareChart() {
        new Chart(document.getElementById('childrenShareChart'), {
            type: 'line',
            data: {
                labels: CONFIG.years,
                datasets: [{
                    label: 'Доля детей 0-17 лет в общем населении',
                    data: CHART_DATA.childrenShare,
                    borderColor: CONFIG.primaryColor,
                    backgroundColor: CONFIG.primaryLight,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: CONFIG.primaryColor,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                ...this.getBaseOptions(),
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Доля детей (%)' },
                        min: 14.5,
                        max: 18,
                        ticks: { callback: value => value + '%' }
                    },
                    x: this.getXAxisOptions()
                }
            }
        });
    },

    createAgeGroupsChart() {
        new Chart(document.getElementById('ageGroupsChart'), {
            type: 'bar',
            data: {
                labels: CONFIG.years,
                datasets: [
                    { label: 'До 3 лет', data: CHART_DATA.ageGroups['0-3'], backgroundColor: CONFIG.primaryColor },
                    { label: '3-7 лет', data: CHART_DATA.ageGroups['3-7'], backgroundColor: '#4a7c59' },
                    { label: '7-17 лет', data: CHART_DATA.ageGroups['7-17'], backgroundColor: '#6b9578' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', onClick: this.createLegendHandler('ageGroups') },
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} детей` } }
                },
                scales: {
                    x: { ...this.getXAxisOptions(), stacked: false },
                    y: { stacked: false, title: { display: true, text: 'Численность детей' }, beginAtZero: true }
                }
            }
        });
    },

    createDetailedAgesChart() {
        const ageLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        const datasets = this.prepareDetailedDatasets();
        
        const detailedChart = new Chart(document.getElementById('detailedAgesChart'), {
            type: 'line',
            data: { labels: ageLabels, datasets },
            options: this.getDetailedChartOptions()
        });

        this.setupHoverEffects(detailedChart);
    },

    prepareDetailedDatasets() {
        const colors = {
            2023: { main: '#ff9e4a', light: 'rgba(255, 158, 74, 0.1)' },
            2025: { main: '#6b9578', light: 'rgba(107, 149, 120, 0.1)' },
            2028: { main: '#999999', light: 'rgba(153, 153, 153, 0.1)' }
        };

        return Object.entries(CHART_DATA.detailedAges).map(([year, data], index) => {
            const maxIndex = data.indexOf(Math.max(...data));
            const minIndex = data.indexOf(Math.min(...data));
            
            return {
                label: year,
                data,
                borderColor: colors[year].main,
                backgroundColor: colors[year].light,
                borderWidth: 2,
                tension: 0.3,
                fill: false,
                borderDash: year === '2028' ? [5, 5] : undefined,
                pointBackgroundColor: data.map((_, i) => colors[year].main),
                pointBorderColor: data.map((_, i) => colors[year].main),
                pointRadius: data.map((_, i) => (i === maxIndex || i === minIndex) ? 7 : 3),
                pointHoverRadius: data.map((_, i) => (i === maxIndex || i === minIndex) ? 9 : 5),
                pointBorderWidth: data.map((_, i) => (i === maxIndex || i === minIndex) ? 2 : 1)
            };
        });
    },

    setupHoverEffects(chart) {
        const canvas = document.getElementById('detailedAgesChart');
        if (!canvas) return;

        const extremePoints = [
            { year: '2023', index: CHART_DATA.detailedAges[2023].indexOf(Math.max(...CHART_DATA.detailedAges[2023])) },
            { year: '2023', index: CHART_DATA.detailedAges[2023].indexOf(Math.min(...CHART_DATA.detailedAges[2023])) },
            { year: '2025', index: CHART_DATA.detailedAges[2025].indexOf(Math.max(...CHART_DATA.detailedAges[2025])) },
            { year: '2025', index: CHART_DATA.detailedAges[2025].indexOf(Math.min(...CHART_DATA.detailedAges[2025])) },
            { year: '2028', index: CHART_DATA.detailedAges[2028].indexOf(Math.max(...CHART_DATA.detailedAges[2028])) },
            { year: '2028', index: CHART_DATA.detailedAges[2028].indexOf(Math.min(...CHART_DATA.detailedAges[2028])) }
        ];

        canvas.addEventListener('mousemove', function(event) {
            const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            
            if (points.length) {
                const point = points[0];
                const datasetIndex = point.datasetIndex;
                const index = point.index;
                
                const yearMap = { '2023': 0, '2025': 1, '2028': 2 };
                const isExtreme = extremePoints.some(p => 
                    datasetIndex === yearMap[p.year] && index === p.index
                );
                
                canvas.style.cursor = isExtreme ? 'pointer' : 'default';
            } else {
                canvas.style.cursor = 'default';
            }
        });
    },

    getBaseOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', onClick: this.createLegendHandler('base') },
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
                y: { beginAtZero: false, title: { display: true, text: 'Численность детей' }, min: 3000, max: 3800 },
                x: this.getXAxisOptions()
            }
        };
    },

    getXAxisOptions() {
        return {
            title: { display: true, text: 'Год' },
            ticks: {
                callback: function(value) {
                    if (this.getLabelForValue(value) === '2025') return '2025*';
                    return this.getLabelForValue(value);
                }
            }
        };
    },

    getDetailedChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', onClick: this.createLegendHandler('detailed') },
                tooltip: { callbacks: { label: this.getDetailedTooltipLabel } }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: { display: true, text: 'Численность детей' },
                    min: 50,
                    max: 300,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                    title: { display: true, text: 'Возраст (количество лет)' },
                    ticks: { maxRotation: 0, minRotation: 0, padding: 10, font: { size: 12 } },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                }
            }
        };
    },

    getDetailedTooltipLabel(context) {
        const year = context.dataset.label;
        const value = context.parsed.y;
        const index = context.dataIndex;
        const data = CHART_DATA.detailedAges[year];
        const maxIndex = data.indexOf(Math.max(...data));
        const minIndex = data.indexOf(Math.min(...data));
        
        let extraInfo = '';
        if (index === maxIndex) extraInfo = ' (самый многочисленный)';
        if (index === minIndex) extraInfo = ' (самый малочисленный)';
        
        return `${year}: ${value} детей${extraInfo}`;
    }
};

// Функционал детских садов
const kindergartenManager = {
    initProgressBars() {
        const yearRows = document.querySelectorAll('.year-row');
        if (!yearRows.length) return;

        yearRows.forEach(row => {
            const percent = parseInt(row.getAttribute('data-percent')) || 0;
            const color = utils.getColorForPercentage(percent);
            const progressFill = row.querySelector('.progress-fill');
            const progressValue = row.querySelector('.progress-value');

            if (progressFill) {
                progressFill.style.backgroundColor = color;
                progressFill.style.width = percent > 0 ? percent + '%' : '0%';
                progressFill.style.minWidth = percent > 0 ? '4px' : '0';
                if (percent === 0) progressFill.style.backgroundColor = 'transparent';
            }

            if (progressValue) {
                progressValue.style.color = color;
            }
        });
    },

    setupTracking() {
        const checkboxes = document.querySelectorAll('.details-toggle');
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    utils.trackGoal('kg_details_opened');
                }
            });
        });
    }
};

// Адаптивность
const responsiveManager = {
    adaptSchoolsForMobile() {
        const isMobile = window.innerWidth <= 768;
        const desktopView = utils.safeQuery('.age-shift-container.desktop-only');
        const mobileView = utils.safeQuery('.mobile-only');
        const schoolsStatsGrid = utils.safeQuery('.schools-stats-grid');

        if (desktopView && mobileView) {
            desktopView.style.display = isMobile ? 'none' : 'flex';
            mobileView.style.display = isMobile ? 'block' : 'none';
        }

        if (schoolsStatsGrid) {
            schoolsStatsGrid.style.gridTemplateColumns = isMobile ? '1fr' : 'repeat(3, 1fr)';
        }
    }
};

// Навигация
const navigationManager = {
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            });
        });

        const arrowCircle = utils.safeQuery('.arrow-circle');
        if (arrowCircle) {
            arrowCircle.addEventListener('click', () => {
                const target = utils.safeQuery('#trends');
                if (!target) return;
                
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            });
        }
    },

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (!mobileMenuToggle || !mobileMenu) {
            console.error('Не найдены элементы мобильного меню');
            return;
        }

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (event) => {
            if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
};

// FAQ аккордеон
const faqManager = {
    setupAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;

            question.addEventListener('click', () => {
                if (!item.classList.contains('active')) {
                    utils.trackGoal('faq_opened');
                }
                
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.display = 'none';
                    }
                });

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
};

// Аналитика
const analyticsManager = {
    trackViewedSections() {
        const sections = ['home', 'trends', 'total', 'age', 'kindergartens', 'schools', 'faq'];
        let viewedCount = 0;
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (!element) return;
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    viewedCount++;
                    if (viewedCount === 3) {
                        if (typeof ym === 'function') {
                            ym(CONFIG.ymId, 'reachGoal', 'viewed_3_sections');
                        }
                        console.log('Цель: viewed_3_sections');
                    }
                    observer.disconnect();
                }
            }, { threshold: 0.3 });
            
            observer.observe(element);
        });
    },

    setupVirtualPageviews() {
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                const anchor = url.split('#')[1] || 'home';
                if (typeof ym === 'function') {
                    ym(CONFIG.ymId, 'hit', '/#' + anchor);
                }
            }
        }).observe(document, {subtree: true, childList: true});
    },

    setupTimeOnSite() {
        setTimeout(() => {
            utils.trackGoal('501358884');
        }, 30000);
    }
};

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

// Инициализация приложения
function initializeApp() {
    try {
        // Добавляем структурированные данные
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        // Создание графиков
        chartHandlers.createTotalChildrenChart();
        chartHandlers.createChildrenShareChart();
        chartHandlers.createAgeGroupsChart();
        chartHandlers.createDetailedAgesChart();

        // Инициализация модулей
        kindergartenManager.initProgressBars();
        kindergartenManager.setupTracking();
        responsiveManager.adaptSchoolsForMobile();
        navigationManager.setupSmoothScrolling();
        navigationManager.setupMobileMenu();
        faqManager.setupAccordion();
        
        // Аналитика
        analyticsManager.trackViewedSections();
        analyticsManager.setupVirtualPageviews();
        analyticsManager.setupTimeOnSite();

        // Обработчики событий
        window.addEventListener('resize', utils.debounce(responsiveManager.adaptSchoolsForMobile, 150));
        
        console.log('=== ПРИЛОЖЕНИЕ УСПЕШНО ЗАГРУЖЕНО ===');
    } catch (error) {
        console.error('Ошибка инициализации:', error);
    }
}

// Запуск при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
// Логи для отладки метрики
console.log('=== Яндекс.Метрика цели загружены ===');
