export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  // Метод для получения карточек с сервера
  async getCards() {
    const res = await fetch(`${this.url}/cards`, {
      headers: this.headers
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для добавления новой карточки на сервер
  async addCard(name, link) {
    const res = await fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для обновления информации о пользователе на сервере
  async updateProfile(name, about) {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для получения информации о пользователе с сервера
  async getUserInfo() {
    const res = await fetch(`${this.url}/users/me`, {
      headers: this.headers
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для удаления карточки с сервера
  async deleteCard(cardId) {
    const res = await fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  }

}
