export class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addInitialCards(element) {
    this._container.append(element);
  }
}
