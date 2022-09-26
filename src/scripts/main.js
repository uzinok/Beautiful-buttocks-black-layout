window.onload = function () {
    // добавим стили для анимации
    let styleD = document.createElement('style');
    styleD.innerHTML = '.details_hide{overflow:hidden;opacity:0;max-height:0;-webkit-transition:max-height 200ms,opacity 200ms;-o-transition:max-height 200ms,opacity 200ms;transition:max-height 200ms,opacity 200ms}.details-visible .details_hide{overflow:auto;opacity:1;max-height:190px}.details_h .details_hide{display:none}details>button{border-radius:none;border:0;-webkit-box-shadow:none;box-shadow:none;background:0 0;font-family:none;font-size:none;padding:0;text-align:inherit}';
    // добавим стили в head
    document.head.appendChild(styleD);
    // ролучаем все спойлеры
    let arrDetails = document.querySelectorAll('details');

    // перебираем все спойлееры для получения необходимых элементов и прослушивания событий
    for (let i = 0; i < arrDetails.length; i++) {

        // по кнопке summary будем отслеживать клик
        let elemSummary;
        // если summary отсутствует - добавляем
        if (!(arrDetails[i].querySelector('summary'))) {
            // если нет поддержки details
            if (!('open' in arrDetails[i]))
                // создаем кнопку
                elemSummary = document.createElement('button');
            else
                // или содаем summary
                elemSummary = document.createElement('summary');
            // добавим текст по умолчанию
            elemSummary.innerHTML = 'подробнее';
            // добавляем текущему спойлеру
            arrDetails[i].insertBefore(elemSummary, arrDetails[i].querySelector('.details_hide'))
        }
        // если summary есть - получаем
        else {
            elemSummary = arrDetails[i].querySelector('summary');
            // если нет поддержки details
            if (!('open' in arrDetails[i])) {
                // тут необходимо вместо summary сделать button
                let button = document.createElement('button');
                // перенесли текст
                button.innerHTML = elemSummary.innerHTML;
                // перенесли классы
                button.setAttribute('class', elemSummary.getAttribute('class'));
                // elemSummary = button;
                // добавили в спойлер кнопку
                arrDetails[i].insertBefore(button, elemSummary);
                // удалили старый summary
                arrDetails[i].removeChild(elemSummary);

                elemSummary = button;
            }
        }

        // если спойлер открыт
        if (arrDetails[i].hasAttribute('open')) {
            // добавляем класс спойлеру что бы контент был виден
            arrDetails[i].classList.add('details-visible');
        }
        // для старых браузеров скрываем контент что бы не было доступа к интерактивным элементам
        else if (!('open' in arrDetails[i])) {
            arrDetails[i].classList.add('details_h');
        }

        // отслеживаем клик
        elemSummary.addEventListener('click', function (event) {

            // получаем родительский блок
            let parentBlock = this.parentNode;

            // если открыт спойлер
            if (parentBlock.classList.contains('details-visible')) {
                // отменяем действие по умолчанию для браузеров поддерживоющих <details>
                event.preventDefault();
                // с анимацией скрываем контент
                parentBlock.classList.remove('details-visible');

                // после завершения анимации
                setTimeout(function () {
                    if (!('open' in parentBlock))
                        // для старых браузеров скрываем контент что бы не было доступа к интерактивным элементам
                        parentBlock.classList.add('details_h');
                    else
                        // для новых - удаляем атрибут open
                        parentBlock.open = false;
                }, 200)
            }
            // если спойлер закрыт
            else {
                // для старых браузеров удаляем display none для контента
                parentBlock.classList.remove('details_h');
                // через минимальный промежуток времени запускаем анимацию css появления контента
                setTimeout(function () {
                    parentBlock.classList.add('details-visible');
                }, 5)
            }
        })
    }
};
