export class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(item => { //отрисовка элементов
      this._renderer(item); 
    })
    //this._renderedItems.forEach(this._renderer); 
  }

  addItem(element) {
   this._container.append(element); //принимает DOM-элемент и добавляет его в контейнер
  }
}
