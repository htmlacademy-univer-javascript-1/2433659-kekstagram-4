import { isEscapeKey } from './utils.js';
import { resetEffect, setupEffect, removeEffect } from './effects.js';
import { resetScale, setupScale, removeScale } from './scale.js';
import { sendData } from './api.js';
import { showMessageSuccess, showMessageError } from './status-messages.js';

const MAX_COUNT_HASHTAG = 5;
const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const bodyElement = document.querySelector('body');
const popup = bodyElement.querySelector('.img-upload__form');
const editPopup = popup.querySelector('.img-upload__overlay');
const closeButton = popup.querySelector('.img-upload__cancel');
const inputUploadElement = popup.querySelector('.img-upload__input ');
const hashtagsField = popup.querySelector('.text__hashtags');
const commentsField = popup.querySelector('.text__description');
const submitButton = bodyElement.querySelector('.img-upload__submit');
const imageElement = bodyElement.querySelector('.my-image-js');
const effectsPreviews = bodyElement.querySelectorAll('.effects__preview');

const pristine = new Pristine (popup, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const openPopup = () => {
  editPopup.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  setupScale();
  setupEffect();
};

const closePopup = () => {
  editPopup.classList.add('hidden');
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

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extarctHastag(value).every((element) => HASTAG_REGEX.test(element));

const isAmountHastag = (value) => extarctHastag(value).length <= MAX_COUNT_HASHTAG;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

pristine.addValidator(hashtagsField, isAmountHastag, `Нельзя вводить более ${MAX_COUNT_HASHTAG} хештегов :-(`);
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
  const selectedFile = inputUploadElement.files[0];
  if(selectedFile.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name)){
    openPopup();
    imageElement.src = URL.createObjectURL(selectedFile);
    effectsPreviews.forEach((picture) => {
      picture.style.backgroundImage = `url('${imageElement.src}')`;
    });
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

const setFormSubmit = (onSuccess) => {
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

export { openEditPopup, setFormSubmit, closePopup, onDocumentKeydown };
