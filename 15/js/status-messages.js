import { isEscapeKey } from './utils.js';
import { onDocumentKeydown as onDocumentKeydownEditPopup} from './open-big-picture.js';

const bodyElement = document.querySelector('body');
const messageSuccess = bodyElement.querySelector('#success').content.querySelector('.success');
const messageError = bodyElement.querySelector('#error').content.querySelector('.error');

const closeMessage = () => {
  const messageElement = bodyElement.querySelector('.success') || bodyElement.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydownEditPopup);
  bodyElement.removeEventListener('click', onBodyElementClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onBodyElementClick (evt) {
  evt.preventDefault();
  if (evt.target.closest('.success__inner') ||
  evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
}

const showMessage = (messageElement, closeButtonClass) => {
  bodyElement.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydownEditPopup);
  bodyElement.addEventListener('click', onBodyElementClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', closeMessage);
};

const showMessageSuccess = () => {
  showMessage(messageSuccess, '.success__button');
};

const showMessageError = () => {
  showMessage(messageError, '.error__button');
};

export { showMessageSuccess, showMessageError };
