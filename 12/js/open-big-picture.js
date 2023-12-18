import { isEscapeKey } from './utils.js';
const COUNT_HASHTAGS = 5;
const HASTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;
const ZOOM_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const Effect = {
  none: {},
  chrome: { style: 'grayscale', unit: '' },
  sepia: { style: 'sepia', unit: '' },
  marvin: { style: 'invert', unit: '%' },
  fobos: { style: 'blur', unit: 'px' },
  heat: { style: 'brightness', unit: '' },
};

const Scale = {
  none: { min: 0, max: 100, step: 1 },
  chrome: { min: 0, max: 1, step: 0.1 },
  sepia: { min: 0, max: 1, step: 0.1 },
  marvin: { min: 0, max: 100, step: 1 },
  fobos: { min: 0, max: 3, step: 0.1 },
  heat: { min: 1, max: 3, step: 0.1 },
};

const bodyElement = document.querySelector('body');
const popup = bodyElement.querySelector('.img-upload__form');
const overlayElement = popup.querySelector('.img-upload__overlay');
const inputUploadElement = popup.querySelector('.img-upload__input ');
const closeButton = popup.querySelector('.img-upload__cancel');
const hashtagsField = popup.querySelector('.text__hashtags');
const commentsField = popup.querySelector('.text__description');

const noneEffectButton = bodyElement.querySelector('#effect-none');
const chromEffectButton = bodyElement.querySelector('#effect-chrome');
const sepiaEffectButton = bodyElement.querySelector('#effect-sepia');
const marvinEffectButton = bodyElement.querySelector('#effect-marvin');
const fobosEffectButton = bodyElement.querySelector('#effect-phobos');
const heatEffectButton = bodyElement.querySelector('#effect-heat');
const sizeField = bodyElement.querySelector('.scale__control--value');
const minusSizeButton = bodyElement.querySelector('.scale__control--smaller');
const plusSizeButton = bodyElement.querySelector('.scale__control--bigger');
const imageElement = bodyElement.querySelector('.my-image-js');
const sliderElement = bodyElement.querySelector('.effect-level__slider');
const effectField = bodyElement.querySelector('.effect-level__value');
const sliderContainer = bodyElement.querySelector('.img-upload__effect-level');


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
  plusSizeButton.addEventListener('click', onPlusSizeButtonClick);
  minusSizeButton.addEventListener('click', onMinusSizeButtonCLick);
  noneEffectButton.addEventListener('change', onNoneEffectButtonChange);
  chromEffectButton.addEventListener('change', onEffectChromeButtonChange);
  sepiaEffectButton.addEventListener('change', onSepiaEffectButtonChange);
  marvinEffectButton.addEventListener('change', onMarvinEffectButtonChange);
  fobosEffectButton.addEventListener('change', onFobosEffectButtonChange);
  heatEffectButton.addEventListener('change', onHeatEffectButtonChange);
  initValidate();
};

const closePopup = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  plusSizeButton.removeEventListener('click', onPlusSizeButtonClick);
  minusSizeButton.removeEventListener('click', onMinusSizeButtonCLick);
  noneEffectButton.removeEventListener('change', onNoneEffectButtonChange);
  chromEffectButton.removeEventListener('change', onEffectChromeButtonChange);
  sepiaEffectButton.removeEventListener('change', onSepiaEffectButtonChange);
  marvinEffectButton.removeEventListener('change', onMarvinEffectButtonChange);
  fobosEffectButton.removeEventListener('change', onFobosEffectButtonChange);
  heatEffectButton.removeEventListener('change', onHeatEffectButtonChange);
  inputUploadElement.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
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

const scaleImage = (value) => {
  imageElement.style.transform=`scale(${value/100})`;
  sizeField.value = `${value}%`;
};

function onMinusSizeButtonCLick (evt) {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) > MIN_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    scaleImage(newSize);
  }
}

function onPlusSizeButtonClick (evt) {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) < MAX_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    scaleImage(newSize);
  }
}

function resetScale () {
  scaleImage(MAX_SCALE);
}

function resetEffect () {
  imageElement.style.filter = 'none';
  sliderContainer.classList.add('hidden');
}

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
});

const updateSlider = (minValue, maxValue, step, style, unit) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: step,
    start: maxValue,
  });
  sliderElement.noUiSlider.on('update', () => {
    effectField.value = sliderElement.noUiSlider.get();
    imageElement.style.filter = `${style}(${effectField.value}${unit})`;
  });
};

function onNoneEffectButtonChange (evt) {
  evt.preventDefault();
  resetEffect();
}

function onEffectChromeButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(Scale.chrome.min, Scale.chrome.max,
    Scale.chrome.step, Effect.chrome.style, Effect.chrome.unit);
}

function onSepiaEffectButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(Scale.sepia.min, Scale.sepia.max,
    Scale.sepia.step, Effect.sepia.style, Effect.sepia.unit);
}

function onMarvinEffectButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(Scale.marvin.min, Scale.marvin.max,
    Scale.marvin.step, Effect.marvin.style, Effect.marvin.unit);
}

function onFobosEffectButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(Scale.fobos.min, Scale.fobos.max,
    Scale.fobos.step, Effect.fobos.style, Effect.fobos.unit);
}

function onHeatEffectButtonChange (evt) {
  evt.preventDefault();
  showSlider();
  updateSlider(Scale.heat.min, Scale.heat.max,
    Scale.heat.step, Effect.heat.style, Effect.heat.unit);
}

export { openEditPopup };
