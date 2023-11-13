const picturesCollection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const photosFragment = document.createDocumentFragment();

const thumbnailsInit = (pictures) => {
  pictures.forEach((url, description, likes, comments) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').src = comments;
    picturesCollection.appendChild(pictureElement);
  });

  picturesCollection.appendChild(photosFragment);
};

export{thumbnailsInit};
