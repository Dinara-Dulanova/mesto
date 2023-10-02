export class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item)); //отрисовка элементов
  }

  addItem(element) {
   //console.log(element);
   this._container.prepend(element); //принимает DOM-элемент и добавляет его в контейнер
  }
}
