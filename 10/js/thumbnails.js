const picturesCollection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ( { url, description, likes, comments, id } ) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const InitThumbnails = (userPhotos) => {
  const fragment = document.createDocumentFragment();
  userPhotos.forEach((userPhoto) => {
    const thumbnail =  createThumbnail(userPhoto);
    fragment.appendChild(thumbnail);
  });

  picturesCollection.appendChild(fragment);
};

export { InitThumbnails };
