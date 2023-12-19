import { isEscapeKey } from './utils.js';
import { sendData } from './api.js';
import { resetEffect, setupEffect, removeEffect } from './effects.js';
import { resetScale, setupScale, removeScale } from './scale.js';
import { showMessageSuccess, showMessageError } from './status-messages.js';

const COUNT_HASHTAGS = 5;
const HASTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const bodyElement = document.querySelector('body');
const popup = bodyElement.querySelector('.img-upload__form');
const overlayElement = popup.querySelector('.img-upload__overlay');
const inputUploadElement = popup.querySelector('.img-upload__input ');
const closeButton = popup.querySelector('.img-upload__cancel');
const hashtagsField = popup.querySelector('.text__hashtags');
const commentsField = popup.querySelector('.text__description');
const submitButton = bodyElement.querySelector('.img-upload__submit');

const pristine = new Pristine (popup, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const openPopup = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  setupScale();
  setupEffect();
};

const closePopup = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  removeScale();
  removeEffect();
  popup.reset();
  pristine.reset();
  resetScale();
  resetEffect();
};

const extractHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extractHastag(value).every((element) => HASTAG_TEMPLATE.test(element));

const isAmountHastag = (value) => extractHastag(value).length <= COUNT_HASHTAGS;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extractHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

pristine.addValidator(hashtagsField, isAmountHastag, `Нельзя вводить более ${COUNT_HASHTAGS} хештегов :-(`);
pristine.addValidator(hashtagsField, isValidHastag, 'Хештег невалиден :-(');
pristine.addValidator(hashtagsField, isUniqueHastag, 'Хештеги не должны повторяться :-(');


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && document.activeElement !== hashtagsField
  && document.activeElement !== commentsField) {
    evt.preventDefault();
    closePopup();
  }
}

const onImageLoadingFieldChange = (evt) => {
  evt.preventDefault();
  const selectedFiel = inputUploadElement.files[0];
  if(selectedFiel.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedFiel.name)){
    openPopup();
  }
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closePopup();
}

const openEditPopup = () => {
  inputUploadElement.addEventListener('change', onImageLoadingFieldChange);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setPopupSubmit = (onSuccess) => {
  popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showMessageSuccess)
        .catch(()=>{
          showMessageError();
        }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { openEditPopup, setPopupSubmit, closePopup, onDocumentKeydown };
