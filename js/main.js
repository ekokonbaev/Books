// Данные для демонстрации книг
const books = [
    {
        title: "Война и мир",
        author: "Лев Толстой",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        pdf: "pdf/voyna.pdf",
        description: "Великий роман Льва Толстого о войне 1812 года и жизни русского общества"
    },
    {
        title: "Преступление и наказание",
        author: "Федор Достоевский",
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.7
    },
    {
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.9
    },
    {
        title: "Евгений Онегин",
        author: "Александр Пушкин",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.6
    }
];

// Функция для создания карточки книги
function createBookCard(book) {
    return `
        <div class="book-card">
            <div class="book-cover-container">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
                <div class="book-overlay">
                    <div class="overlay-buttons">
                        <button class="preview-btn" data-pdf="${book.pdf}" title="Предпросмотр книги">
                            <i class="fas fa-eye"></i>
                            <span>Предпросмотр</span>
                        </button>
                        <button class="favorite-btn" title="Добавить в избранное">
                            <i class="far fa-heart"></i>
                            <span>В избранное</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <p class="description">${book.description}</p>
                <div class="rating">
                    ${createRatingStars(book.rating)}
                    <span>${book.rating}</span>
                </div>
                <div class="book-actions">
                    <button class="read-btn" data-pdf="${book.pdf}" title="Читать книгу">
                        <i class="fas fa-book-open"></i>
                        <span>Читать</span>
                    </button>
                    <button class="download-btn" data-pdf="${book.pdf}" title="Скачать книгу">
                        <i class="fas fa-download"></i>
                        <span>Скачать</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Функция для создания звезд рейтинга
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Функция для отображения книг
function displayBooks() {
    const booksGrid = document.querySelector('.books-grid');
    if (booksGrid) {
        booksGrid.innerHTML = books.map(book => createBookCard(book)).join('');
    }
}

// Функция для плавной прокрутки
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Функция для открытия PDF в новом окне
function openPDF(pdfPath) {
    window.open(pdfPath, '_blank');
}

// Функция для скачивания PDF
function downloadPDF(pdfPath) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Функция для обработки формы
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Анимация кнопки отправки
    const submitBtn = form.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Имитация отправки данных
    setTimeout(() => {
        // Здесь будет реальная отправка данных на сервер
        console.log('Отправленные данные:', data);
        
        // Показываем сообщение об успехе
        showNotification('Сообщение успешно отправлено!', 'success');
        
        // Возвращаем кнопку в исходное состояние
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Очищаем форму
        form.reset();
    }, 1500);
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Добавляем стили для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left: 4px solid #2ecc71;
    }

    .notification.error {
        border-left: 4px solid #e74c3c;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.success i {
        color: #2ecc71;
    }

    .notification.error i {
        color: #e74c3c;
    }
`;
document.head.appendChild(notificationStyles);

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Отображаем книги
    displayBooks();

    // Добавляем обработчики для навигации
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Обработчики для кнопок книг
    document.addEventListener('click', (e) => {
        if (e.target.closest('.read-btn')) {
            const pdfPath = e.target.closest('.read-btn').dataset.pdf;
            openPDF(pdfPath);
        }
        if (e.target.closest('.download-btn')) {
            const pdfPath = e.target.closest('.download-btn').dataset.pdf;
            downloadPDF(pdfPath);
        }
        if (e.target.closest('.preview-btn')) {
            const pdfPath = e.target.closest('.preview-btn').dataset.pdf;
            openPDF(pdfPath);
        }
        if (e.target.closest('.favorite-btn')) {
            const btn = e.target.closest('.favorite-btn');
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        }
    });

    // Добавляем анимацию при прокрутке
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = '#ffffff';
        }
    });

    // Добавляем эффект пульсации при наведении на кнопки
    const buttons = document.querySelectorAll('.read-btn, .download-btn, .preview-btn, .favorite-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Обработчик формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Добавляем анимацию для элементов
    document.querySelectorAll('.feature, .contact-item, .about-image, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Добавляем стили для анимации
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .feature.animate,
        .contact-item.animate,
        .about-image.animate,
        .contact-form.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyles);
});

// Обновляем стили для карточек книг
const style = document.createElement('style');
style.textContent = `
    .book-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        position: relative;
    }

    .book-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .book-cover-container {
        position: relative;
        overflow: hidden;
    }

    .book-cover {
        width: 100%;
        height: 350px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .book-card:hover .book-cover {
        transform: scale(1.05);
    }

    .book-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .book-card:hover .book-overlay {
        opacity: 1;
    }

    .preview-btn, .favorite-btn {
        background-color: var(--white);
        color: var(--primary-color);
        border: none;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
    }

    .preview-btn:hover, .favorite-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .preview-btn:active, .favorite-btn:active {
        transform: translateY(0);
    }

    .preview-btn::after, .favorite-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
    }

    .preview-btn:hover::after, .favorite-btn:hover::after {
        width: 300px;
        height: 300px;
    }

    .book-info {
        padding: 1.5rem;
    }

    .book-info h3 {
        margin-bottom: 0.5rem;
        color: var(--primary-color);
        font-size: 1.4rem;
    }

    .author {
        color: #666;
        margin-bottom: 0.8rem;
        font-style: italic;
    }

    .description {
        color: #666;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.2rem;
    }

    .rating i {
        color: #f1c40f;
    }

    .book-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .read-btn, .download-btn {
        flex: 1;
        padding: 0.8rem 1.2rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
    }

    .read-btn {
        background-color: var(--secondary-color);
        color: white;
    }

    .download-btn {
        background-color: var(--light-bg);
        color: var(--text-color);
    }

    .read-btn::after, .download-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
    }

    .read-btn:hover::after, .download-btn:hover::after {
        width: 300px;
        height: 300px;
    }

    .overlay-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 80%;
    }

    .preview-btn i, .favorite-btn i {
        font-size: 1.2rem;
    }

    .favorite-btn.active {
        background-color: var(--accent-color);
        color: var(--white);
    }

    .favorite-btn.active i {
        animation: heartBeat 0.3s ease;
    }

    @keyframes heartBeat {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }

    @media (max-width: 768px) {
        .book-actions {
            flex-direction: column;
        }

        .overlay-buttons {
            width: 90%;
        }
    }
`;
document.head.appendChild(style); 