# Проект: Место

https://dinara-dulanova.github.io/mesto/ <br />
Здесь реализован проект о местах. Пользователи могут делиться фотографиями и названиями, а также ставить лайки. Использовались следующие технологии: Js, HTML, Css, flexbox, grid, адаптивная верстка.
Проект сверстан на основе макета в Фигме для наиболее популярных разрешений экранов.

**Что реализовано**
* cоздана файловая структура CSS по методолгии БЭМ (Nested);
* адаптивная верстка по макету в Фигме;
* комбинирование Grid и flex технологий
* интерактивность при наведении мышки
* использована функция calc() для динамического расчета размера шрифта и размера блока
* карточки загружаются при помощи JavaScript из массива
* добавлены кропки для лайка и удаления карточки
* popup для редактирования профиля при помощи JavaScript
* popup для добавления карточки с местом (название места и ссылка на картинку) при помощи JavaScript
* popup, который при клике на карточку открывает изображение в большем размере при помощи JavaScript
* плавное открытие и закрытие изображений
* переполнение блока с появляющимся многоточием в конце
* валидация формы «Редактировать профиль» и «Новое место»
* закрытие попапа кликом на оверлей
* закрытие попапа нажатием на Esc
* разбитие JavaScript на модули
* класс Card, который создаёт карточку с текстом и ссылкой на изображение:
    * принимает в конструктор её данные и селектор её template-элемента;
    * содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
    * содержит приватные методы для каждого обработчика;
    * содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
* класс FormValidator, который настраивает валидацию полей формы:
    * принимает в конструктор объект настроек с селекторами и классами формы;
    * принимает вторым параметром элемент той формы, которая валидируется;
    * имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
    * имеет публичный метод enableValidation, который включает валидацию формы


