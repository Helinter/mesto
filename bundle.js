(()=>{"use strict";const e=document.querySelector(".card").content,t=document.querySelector(".popup__input_type_name"),s=document.querySelector(".popup__input_type_job"),n=document.querySelector(".profile__info-title"),i=document.querySelector(".profile__info-subtitle"),o=document.querySelector(".profile__avatar"),r=document.querySelector(".profile__info-edit-button"),l=document.forms.profileForm,a=document.querySelector(".profile__add-button"),c=document.forms.placeForm;class h{constructor(e,t,s,n,i,o,r){this._popupFormDelete=r,this.id=e._id,this.myId=i,this.api=o,this._cardElement=t.querySelector(".element").cloneNode(!0),this._name=e.name,this._link=e.link,this._likes=e.likes,this._ownerId=e.ownerId,this._titleImage=this._cardElement.querySelector(".element__image"),this._deleteButton=this._cardElement.querySelector(".element__delete-button"),this._likeButton=this._cardElement.querySelector(".element__like-button"),this._likeCounter=this._cardElement.querySelector(".element__like-counter"),this._listItem=this._deleteButton.closest(".element"),this._handleCardClick=s,this._handleDeleteClick=n,this._imageData={link:this._link,name:this._name}}getCardId(){return this.id}createCard(){return this._htmlSettings(),this._setEventListeners(),this._ownerId!==this.myId&&this._deleteButton.remove(),this.isLikedByCurrentUser()?this._likeButton.classList.add("element__like-button_active"):this._likeButton.classList.remove("element__like-button_active"),this._cardElement}_updateDeleteButton(){this._ownerId===this.myId?this._cardElement.appendChild(this._deleteButton):this._deleteButton.remove()}_htmlSettings(){this._cardElement.querySelector(".element__title").textContent=this._name,this._titleImage.setAttribute("src",this._link),this._titleImage.setAttribute("alt",this._name),this._likeCounter.textContent=this._likes.length}_setEventListeners(){this._likeButton.addEventListener("click",(()=>this.toggleLike())),this._deleteButton.addEventListener("click",(()=>this._deleteOn())),this._titleImage.addEventListener("click",(()=>this._popupImgOn()))}_popupImgOn(){this._handleCardClick(this._imageData)}_deleteOn(){this._handleDeleteClick(this)}deleteCard(){this.api.deleteCard(this.id).then((()=>{this._listItem.remove(),this._listItem=null,this._popupFormDelete.close(),console.log("карточка удалена")})).catch((e=>{console.error("Ошибка при удалении карточки:",e)}))}updateLikeCount(){this._likeCounter.textContent=this._likes.length}isLikedByCurrentUser(){return this._likes.some((e=>e._id===this.myId))}toggleLike(){this.isLikedByCurrentUser()?this.api.deleteLike(this.id).then((e=>{this._likes=e.likes,this.updateLikeCount(),this._likeButton.classList.remove("element__like-button_active")})).catch((e=>{console.error("Ошибка при снятии лайка:",e)})):this.api.addLike(this.id).then((e=>{this._likes=e.likes,this.updateLikeCount(),this._likeButton.classList.add("element__like-button_active")})).catch((e=>{console.error("Ошибка при постановке лайка:",e)}))}}class u{constructor(e,t){this._submitButton=document.getElementById("cardSubmit"),this._config=e,this._formElement=t,this._inputsList=this._formElement.querySelectorAll(this._config.inputSelector),this._submitButtonElement=this._formElement.querySelector(this._config.submitButtonSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._config.inputSelector))}enableValidation(){this._setEventListeners()}_setEventListeners(){[...this._inputsList].forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}_toggleButtonState(){this._formElement.checkValidity()?(this._submitButtonElement.disabled=!1,this._submitButtonElement.classList.remove(this._config.inactiveButtonClass)):(this._submitButtonElement.disabled=!0,this._submitButtonElement.classList.add(this._config.inactiveButtonClass))}_checkInputValidity(e){this._errorElement=this._formElement.querySelector(`#${e.name}-error`);const t=e.validity.valid;this._errorElement&&(t?this._hideError(e):this._showError(e))}_showError(e){e.classList.add(this._config.inputErrorClass),this._errorElement.textContent=e.validationMessage}_hideError(e){e.classList.remove(this._config.inputErrorClass),this._errorElement.textContent=e.validationMessage}buttonDisabled(){this._submitButton.classList.add(this._config.inactiveButtonClass),this._submitButton.disabled=!0}}const d={formSelector:".form",inputSelector:".popup__input",submitButtonSelector:".popup__container-button",inactiveButtonClass:"popup__container-button_invalid",inputErrorClass:"popup__input_invalid",errorClass:"error"};class _{constructor({items:e,renderer:t},s){this._renderer=t,this._container=document.querySelector(s),this._items=e.reverse()}renderItems(){this._items.forEach((e=>{this._renderer(e)}))}addItem(e,t=!1){t?this._container.prepend(e):this._container.append(e)}}class p{constructor(e){this._popupSelector=e,this._popupElement=document.querySelector(e),this._closePopup=this._popupElement.querySelector(".popup__container-close-button"),this._popupContainer=this._popupElement.querySelector(".popup__container"),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}_handleOverlayClose(){this._popupElement.addEventListener("click",(e=>{e.target===this._popupElement&&this.close()}))}setEventListeners(){this._closePopup.addEventListener("click",this.close.bind(this)),this._handleOverlayClose()}}class m extends p{constructor(e){super(e),this._popupImg=this._popupElement.querySelector(".popup__img"),this._popupTitle=this._popupElement.querySelector(".popup__image-container-title")}open(e){super.open(),this._popupTitle.textContent=e.name,this._popupImg.src=e.link,this._popupImg.alt=e.name}}class E extends p{constructor(e,t){super(e),this.formElement=this._popupElement.querySelector(".form"),this.handleFormSubmit=t,this._formSubmitButton=this._popupElement.querySelector(".popup__container-button"),this._inputElements=this.formElement.querySelectorAll("input")}close(){super.close(),this.formElement.reset()}_getInputValues(){const e={};return this._inputElements.forEach((t=>{const s=t.name,n=t.value;e[s]=n})),e}renderLoading(e){this._formSubmitButton.textContent=e?"Сохранение...":"Сохранить"}setEventListeners(){super.setEventListeners(),this.formElement.addEventListener("submit",(e=>{e.preventDefault(),this.handleFormSubmit(this._getInputValues())}))}}const f=new class{constructor(e){this.url=e.url,this.headers=e.headers}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}async getCards(){const e=await fetch(`${this.url}/cards`,{headers:this.headers});return this._checkResponse(e)}async addCard(e,t){const s=await fetch(`${this.url}/cards`,{method:"POST",headers:this.headers,body:JSON.stringify({name:e,link:t})});return this._checkResponse(s)}async updateProfile(e,t){const s=await fetch(`${this.url}/users/me`,{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e,about:t})});return await this._checkResponse(s)}async getUserInfo(){const e=await fetch(`${this.url}/users/me`,{headers:this.headers});return this._checkResponse(e)}async deleteCard(e){const t=await fetch(`${this.url}/cards/${e}`,{method:"DELETE",headers:this.headers});return this._checkResponse(t)}async addLike(e){const t=await fetch(`${this.url}/cards/likes/${e}`,{method:"PUT",headers:this.headers});return this._checkResponse(t)}async deleteLike(e){const t=await fetch(`${this.url}/cards/likes/${e}`,{method:"DELETE",headers:this.headers});return this._checkResponse(t)}async updateAvatar(e){const t=await fetch(`${this.url}/users/me/avatar`,{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})});return this._checkResponse(t)}}({url:"https://mesto.nomoreparties.co/v1/cohort-72",headers:{authorization:"fd0f9f25-2a5d-4f26-a017-454ad9a03645","Content-Type":"application/json"}}),k=new class{constructor({nameSelector:e,infoSelector:t,avatarSelector:s}){this._nameElement=document.querySelector(e),this._infoElement=document.querySelector(t),this._avatarElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,info:this._infoElement.textContent,avatar:this._avatarElement.src}}setUserInfo({name:e,about:t,avatar:s,_id:n}){this._nameElement.textContent=e,this._infoElement.textContent=t,this._avatarElement.src=s,this._avatarElement.dataset.id=n}}({nameSelector:".profile__info-title",infoSelector:".profile__info-subtitle",avatarSelector:".profile__avatar"});let v;f.getUserInfo().then((e=>{const t=e;return n.textContent=t.name,i.textContent=t.about,o.src=t.avatar,v=t._id,v})).then((n=>{console.log(n);const i=new E(".popup_type_edit-profile",(e=>{i.renderLoading(!0);const t=e.formName,s=e.formJob;f.updateProfile(t,s).then((e=>{k.setUserInfo(e),i.close()})).catch((e=>{console.error("Ошибка при обновлении профиля:",e)})).finally((()=>{i.renderLoading(!1)}))}));function o(e){const t=new u(d,e);t.enableValidation(),e.addEventListener("submit",(()=>{t.buttonDisabled()}))}i.setEventListeners(),r.addEventListener("click",(()=>{const e=k.getUserInfo().name,n=k.getUserInfo().info;t.value=e,s.value=n,i.open()})),a.addEventListener("click",(()=>{p.open()}));const p=new E(".popup_type_card",(e=>{p.renderLoading(!0);const t={name:e.formPlace,link:e.formLink,likes:[]};f.addCard(t.name,t.link).then((e=>{t._id=e._id,t.ownerId=n,function(e,t){const s=I(e,t);y.addItem(s,!0)}(t,n),p.close()})).catch((e=>{console.error("Ошибка при добавлении карточки:",e)})).finally((()=>{p.renderLoading(!1)}))}));p.setEventListeners();const v=new m(".popup_type_image");let y;function g(e){v.open(e)}v.setEventListeners(),o(l),o(c),f.getCards().then((e=>{const t=e.map((e=>({name:e.name,link:e.link,likes:e.likes,ownerId:e.owner._id,_id:e._id})));y=new _({items:t,renderer:B},".elements"),y.renderItems()}));const L=new E(".popup_type_delete",(function(){C.deleteCard()}));let C;function S(e){L.open(),C=e}L.setEventListeners(),document.querySelector(".profile__avatar-edit-icon").addEventListener("click",(function(){b.open()}));const b=new E(".popup_type_edit-avatar",(e=>{b.renderLoading(!0);const t=e.formAvatar;f.updateAvatar(t).then((e=>{k.setUserInfo(e),b.close()})).catch((e=>{console.error("Ошибка при обновлении аватара:",e)})).finally((()=>{b.renderLoading(!1)}))}));function I(t,s){return new h(t,e,g,S,s,f,L).createCard()}function B(e){y.addItem(I(e,n),!0)}b.setEventListeners()})).catch((e=>{console.error("Ошибка",e)}))})();