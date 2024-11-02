(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{WY:()=>x});var t,n={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__error-text"},r={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-25/",headers:{authorization:"90d29a06-be47-4d93-96ab-3707cf211001","Content-Type":"application/json"}};function o(){return fetch("".concat(r.baseUrl,"users/me"),{headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function c(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function u(e){e.target.classList.contains("popup_is-opened")&&i(document.querySelector(".popup_is-opened"))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),document.addEventListener("click",u)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),document.removeEventListener("click",u)}function s(e,n,r,o,c){var u=document.querySelector("#card-template").content.querySelector("li").cloneNode(!0),s=u.querySelector(".card__title"),l=u.querySelector(".card__image"),d=u.querySelector(".card__delete-button"),p=u.querySelector(".card__like-button"),f=u.querySelector(".card__like-counter");return s.textContent=e.name,l.src=e.link,l.alt=e.name,f.textContent=e.likes.length,function(e,t){return e.owner._id===t}(e,n)&&(d.style.display="block"),function(e,t){return e.likes.some((function(e){return e._id===t}))}(e,n)&&(e.userLikes=!0,p.classList.add("card__like-button_is-active")),d.addEventListener("click",(function(){a(x),t=function(){r(u,e).then((function(){i(x)})).catch((function(e){console.error("Ошибка: ".concat(e))}))}})),p.addEventListener("click",(function(){o(p,f,e)})),l.addEventListener("click",(function(){c(e.name,e.link)})),u}function l(e,t){return(n=t._id,fetch("".concat(r.baseUrl,"cards/").concat(n),{method:"DELETE",headers:r.headers}).then((function(e){return e.ok?e:Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){e.remove()})).catch((function(e){console.error("Ошибка: ".concat(e))}));var n}function d(e,t,n){var o=n.userLikes?"DELETE":"PUT";(function(e,t){return fetch("".concat(r.baseUrl,"cards/likes/").concat(e),{method:t,headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(n._id,o).then((function(r){t.textContent=r.likes.length,e.classList.toggle("card__like-button_is-active"),n.userLikes=!n.userLikes})).catch((function(e){console.error("Ошибка: ".concat(e))}))}function p(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}function m(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){n.setCustomValidity(""),p(e,t,n)})),f(e,n,r)}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v,h=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),q=document.querySelector(".places__list"),k=document.querySelector(".profile__add-button"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__image-overlay"),g=Array.from(document.querySelectorAll(".popup__close")),C=document.querySelector(".popup_type_new-card"),j=document.querySelector(".popup_type_edit"),A=document.querySelector(".popup_type_edit-avatar"),P=document.querySelector(".popup_type_image"),x=document.querySelector(".popup_type_confirm-delete"),O=j.querySelector(".popup__form"),T=A.querySelector(".popup__form"),U=O.querySelector(".popup__input_type_name"),w=O.querySelector(".popup__input_type_description"),B=T.querySelector(".popup__input_type_avatar-url"),D=C.querySelector(".popup__form"),I=D.querySelector(".popup__input_type_card-name"),M=D.querySelector(".popup__input_type_url"),N=x.querySelector(".popup__form"),H=P.querySelector(".popup__image"),J=P.querySelector(".popup__caption");function V(e){h.textContent=e.name,S.textContent=e.about,b.style.backgroundImage="url(".concat(e.avatar,")")}function W(e){e.reset();var t=e.querySelector(n.submitButtonSelector),r=Array.from(e.querySelectorAll(n.inputSelector));f(n,r,t)}function z(e,t){var r=e.querySelector(n.submitButtonSelector);r.textContent=t?"Сохранение...":r.getAttribute("data-button-text")}function Y(e,t){J.textContent=e,H.src=t,H.alt=e,a(P)}Promise.all([o(),fetch("".concat(r.baseUrl,"cards"),{headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t=y(e,2),n=t[0],r=t[1],o=n._id;V(n),function(e,t){e.forEach((function(e){var n=s(e,t,l,d,Y);q.append(n)}))}(r,o)})).catch((function(e){console.error("Ошибка: ".concat(e))})),g.forEach((function(e){e.addEventListener("click",(function(e){i(e.target.closest(".popup"))}))})),N.addEventListener("submit",(function(e){e.preventDefault(),t()})),v=n,Array.from(document.querySelectorAll(v.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?p(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.textContent=r,o.classList.add(e.errorClass)}(e,t,n,n.validationMessage)}(e,t,o),f(e,n,r)}))}))}(v,e)})),k.addEventListener("click",(function(){a(C)})),D.addEventListener("submit",(function(e){e.preventDefault(),z(D,!0);var t,n,c={name:I.value,link:M.value};Promise.all([o(),(t=c.name,n=c.link,fetch("".concat(r.baseUrl,"cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})))]).then((function(e){var t=y(e,2),n=t[0],r=s(t[1],n._id,l,d,Y);q.prepend(r),W(D),i(C)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(e){z(D,!1)}))})),E.addEventListener("click",(function(){O.name.value=h.textContent,O.description.value=S.textContent,m(n,O),a(j)})),O.addEventListener("submit",(function(e){e.preventDefault(),z(O,!0),function(e,t){return fetch("".concat(r.baseUrl,"users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(U.value,w.value).then((function(e){V(e),i(j)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){z(O,!1)}))})),L.addEventListener("click",(function(){m(n,T),a(A)})),T.addEventListener("submit",(function(e){var t;e.preventDefault(),z(T,!0),(t=B.value,fetch(t,{method:"HEAD"}).then((function(e){return console.log(e.headers.get("Content-Type")),e.ok&&e.headers.get("Content-Type").startsWith("image/")?fetch("".concat(r.baseUrl,"users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:t})}):Promise.reject("По этой ссылке нет изображения")})).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){return Promise.reject("Ссылка на аватар не прошла валидацию: ".concat(e))}))).then((function(e){V(e),W(T),i(A)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){z(T,!1)}))}))})();