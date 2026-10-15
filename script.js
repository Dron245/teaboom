document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Выбор фасовки ---------- */
    const variantItems = document.querySelectorAll('.variant-item');
    const currentSkuElem = document.getElementById('current-sku');
    const displayPriceElem = document.getElementById('display-price');
    const displayOldPriceElem = document.getElementById('display-old-price');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    variantItems.forEach(item => {
        item.addEventListener('click', () => {
            // Убираем активный класс у всех фасовок
            variantItems.forEach(v => v.classList.remove('active'));

            // Добавляем активный класс выбранной фасовке
            item.classList.add('active');

            // Извлекаем данные из дата-атрибутов
            const sku = item.dataset.sku;
            const price = item.dataset.price;
            const oldPrice = item.dataset.oldPrice;

            // Обновляем информацию на экране
            currentSkuElem.textContent = sku;
            displayPriceElem.textContent = price;
            displayOldPriceElem.textContent = oldPrice;

            // Дополнительная визуальная анимация обновления цены
            displayPriceElem.style.transform = 'scale(1.05)';
            setTimeout(() => {
                displayPriceElem.style.transform = 'scale(1)';
            }, 150);
        });
    });

    /* ---------- Кнопка «В корзину» ---------- */
    addToCartBtn.addEventListener('click', () => {
        const activeVariant = document.querySelector('.variant-item.active');
        const weight = activeVariant ? activeVariant.dataset.weight : '100 г';
        const sku = currentSkuElem.textContent;
        const price = displayPriceElem.textContent;

        alert(`Товар добавлен в корзину:\nАнанасовый улун (${weight})\nАртикул: ${sku}\nЦена: ${price}`);
    });

    /* ---------- Модальное окно с изображением ---------- */
    const mainImage = document.getElementById('main-product-image');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const modalClose = document.getElementById('image-modal-close');

    const openModal = () => {
        if (!mainImage) return;
        modalImg.src = mainImage.src;
        modalImg.alt = mainImage.alt;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Открытие по клику на главное изображение
    if (mainImage) {
        mainImage.addEventListener('click', openModal);
    }

    // Закрытие по клику на крестик
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по клику на затемнённый фон (но не по самому изображению)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Закрытие по клавише Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});