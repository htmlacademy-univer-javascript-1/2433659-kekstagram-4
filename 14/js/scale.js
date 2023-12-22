const ZOOM_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const bodyElement = document.querySelector('body');
const sizeField = bodyElement.querySelector('.scale__control--value');
const minusSizeButton = bodyElement.querySelector('.scale__control--smaller');
const plusSizeButton = bodyElement.querySelector('.scale__control--bigger');
const imageElement = bodyElement.querySelector('.my-image-js');

const scaleImage = (value) => {
  imageElement.style.transform=`scale(${value/100})`;
  sizeField.value = `${value}%`;
};

const onMinusSizeButtonCLick = (evt) => {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) > MIN_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize - ZOOM_STEP;
    scaleImage(newSize);
  }
};

const onPlusSizeButtonClick = (evt) => {
  evt.preventDefault();
  if(parseInt(sizeField.value, 10) < MAX_SCALE){
    const currentSize = parseInt(sizeField.value, 10);
    const newSize = currentSize + ZOOM_STEP;
    scaleImage(newSize);
  }
};

const resetScale = () => {
  scaleImage(MAX_SCALE);
};

const setupScale = () => {
  plusSizeButton.addEventListener('click', onPlusSizeButtonClick);
  minusSizeButton.addEventListener('click', onMinusSizeButtonCLick);
};

const removeScale = () => {
  plusSizeButton.removeEventListener('click', onPlusSizeButtonClick);
  minusSizeButton.removeEventListener('click', onMinusSizeButtonCLick);
};

export { setupScale, removeScale, resetScale };
