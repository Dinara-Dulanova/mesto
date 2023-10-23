export class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(item => { //отрисовка элементов
      //console.log(item);
      this._renderer(item); 
    })
    //this._renderedItems.forEach(this._renderer); 
  }

  addItem(item) {
    this._container.append(item); //принимает DOM-элемент и добавляет его в контейнер
  }

  addNewItem(item) {
    this._container.prepend(item); //принимает DOM-элемент и добавляет его в контейнер
  }
}