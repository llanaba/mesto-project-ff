(()=>{"use strict";function e(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector("li").cloneNode(!0),c=r.querySelector(".card__title"),p=r.querySelector(".card__image"),u=r.querySelector(".card__delete-button"),i=r.querySelector(".card__like-button");return c.textContent=e.name,p.src=e.link,p.alt=e.name,u.addEventListener("click",(function(){t(r)})),i.addEventListener("click",(function(){n(r)})),p.addEventListener("click",(function(){o(e.name,e.link)})),r}function t(e){e.remove()}function n(e){e.querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}function o(e){"Escape"===e.key&&p(document.querySelector(".popup_is-opened"))}function r(e){e.target.classList.contains("popup_is-opened")&&p(document.querySelector(".popup_is-opened"))}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),document.addEventListener("click",r)}function p(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),document.removeEventListener("click",r)}var u=document.querySelector(".profile__title"),i=document.querySelector(".profile__description"),d=document.querySelector(".places__list"),a=document.querySelector(".profile__add-button"),l=document.querySelector(".profile__edit-button"),s=Array.from(document.querySelectorAll(".popup__close")),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_image"),v=m.querySelector(".popup__form"),f=v.querySelector(".popup__input_type_name"),k=v.querySelector(".popup__input_type_description"),q=_.querySelector(".popup__form"),S=q.querySelector(".popup__input_type_card-name"),L=q.querySelector(".popup__input_type_url"),E=y.querySelector(".popup__image"),g=y.querySelector(".popup__caption");function h(e,t){g.textContent=e,E.src=t,E.alt=e,c(y)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(o,t,n,h);d.append(r)})),s.forEach((function(e){e.addEventListener("click",(function(e){p(e.target.closest(".popup"))}))})),a.addEventListener("click",(function(){c(_)})),q.addEventListener("submit",(function(o){o.preventDefault();var r=e({name:S.value,link:L.value},t,n,h);d.prepend(r),q.reset(),p(_)})),l.addEventListener("click",(function(){v.name.value=u.textContent,v.description.value=i.textContent,c(m)})),v.addEventListener("submit",(function(e){e.preventDefault(),u.textContent=f.value,i.textContent=k.value,p(m)}))})();