const Effect = {
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  FOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const bodyElement = document.querySelector('body');
const noneEffectButton = bodyElement.querySelector('#effect-none');
const chromEffectButton = bodyElement.querySelector('#effect-chrome');
const sepiaEffectButton = bodyElement.querySelector('#effect-sepia');
const marvinEffectButton = bodyElement.querySelector('#effect-marvin');
const fobosEffectButton = bodyElement.querySelector('#effect-phobos');
const heatEffectButton = bodyElement.querySelector('#effect-heat');
const imageElement = bodyElement.querySelector('.my-image-js');
const sliderElement = bodyElement.querySelector('.effect-level__slider');
const effectField = bodyElement.querySelector('.effect-level__value');
const sliderContainer = bodyElement.querySelector('.img-upload__effect-level');

const resetEffect = () => {
  imageElement.style.filter = 'none';
  sliderContainer.classList.add('hidden');
};

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

const onNoneEffectButtonChange = (evt) => {
  evt.preventDefault();
  resetEffect();
};

const onChromeEffectButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.CHROME.min, Effect.CHROME.max,
    Effect.CHROME.step, Effect.CHROME.style, Effect.CHROME.unit);
};

const onSepiaEffectButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.SEPIA.min, Effect.SEPIA.max,
    Effect.SEPIA.step, Effect.SEPIA.style, Effect.SEPIA.unit);
};

const onMarvinEffectButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.MARVIN.min, Effect.MARVIN.max,
    Effect.MARVIN.step, Effect.MARVIN.style, Effect.MARVIN.unit);
};

const onFobosEffectButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.FOBOS.min, Effect.FOBOS.max,
    Effect.FOBOS.step, Effect.FOBOS.style, Effect.FOBOS.unit);
};

const onHeatEffectButtonChange = (evt) => {
  evt.preventDefault();
  showSlider();
  updateSlider(Effect.HEAT.min, Effect.HEAT.max,
    Effect.HEAT.step, Effect.HEAT.style, Effect.HEAT.unit);
};

const setupEffect = () => {
  noneEffectButton.addEventListener('change', onNoneEffectButtonChange);
  chromEffectButton.addEventListener('change', onChromeEffectButtonChange);
  sepiaEffectButton.addEventListener('change', onSepiaEffectButtonChange);
  marvinEffectButton.addEventListener('change', onMarvinEffectButtonChange);
  fobosEffectButton.addEventListener('change', onFobosEffectButtonChange);
  heatEffectButton.addEventListener('change', onHeatEffectButtonChange);
};

const removeEffect = () => {
  noneEffectButton.removeEventListener('change', onNoneEffectButtonChange);
  chromEffectButton.removeEventListener('change', onChromeEffectButtonChange);
  sepiaEffectButton.removeEventListener('change', onSepiaEffectButtonChange);
  marvinEffectButton.removeEventListener('change', onMarvinEffectButtonChange);
  fobosEffectButton.removeEventListener('change', onFobosEffectButtonChange);
  heatEffectButton.removeEventListener('change', onHeatEffectButtonChange);
};

export { resetEffect, setupEffect, removeEffect };
