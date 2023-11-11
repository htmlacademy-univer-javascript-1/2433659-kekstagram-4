import { getPhotos } from './data.js';

const listElement = document.querySelector('.pictures');
const pictureOfRandomUserTemplate = document.querySelector('#picture');

const otherPhotos = getPhotos();

const listFragment = document.createDocumentFragment();

otherPhotos.forEach((url, description, likes, comments) => {
  const pictureElement = pictureOfRandomUserTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').src = comments;
  listElement.appendChild(pictureElement);
});

listElement.appendChild(listFragment);
