import { isEscapeKey } from './utils.js';
const COUNT_HASHTAGS = 5;
const HASTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;

const bodyElement = document.querySelector('body');
const popup = bodyElement.querySelector('.img-upload__form');
const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const inputUploadElement = bodyElement.querySelector('.img-upload__input ');
const closeButton = bodyElement.querySelector('.img-upload__cancel');
const hashtagsField = bodyElement.querySelector('.text__hashtags');
const commentsField = bodyElement.querySelector('.text__description');

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
  initValidate();
};

const closePopup = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  hashtagsField.value = '';
  commentsField.value = '';
  inputUploadElement.value = '';
  pristine.reset();
};

const extarctHastag = (value) => value.trim().split(' ').filter((element) => element.length > 0);

const isValidHastag = (value) => extarctHastag(value).every((element) => HASTAG_TEMPLATE.test(element));

const isAmountHastag = (value) => extarctHastag(value).length <= COUNT_HASHTAGS;

const isUniqueHastag = (value) => {
  const oneCaseHastags = extarctHastag(value).map((element) => element.toLowerCase());
  return new Set(oneCaseHastags).size === oneCaseHastags.length;
};

function initValidate () {
  pristine.addValidator(hashtagsField, isAmountHastag, `Нельзя вводить более ${COUNT_HASHTAGS} хештегов :-(`);
  pristine.addValidator(hashtagsField, isValidHastag, 'Хештег невалиден :-(');
  pristine.addValidator(hashtagsField, isUniqueHastag, 'Хештеги не должны повторяться :-(');
}

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

export { openEditPopup };
