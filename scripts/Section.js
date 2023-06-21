export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  addItem(element) {
    if (this._items.length > 1) {
    this._container.append(element);}
    else { this._container.prepend(element);}
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    })
    };
  }


