import { showBigPicture } from './big-picture.js';
import { initThumbnails } from './thumbnails.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if(!thumbnail) {

    return;
  }

  evt.preventDefault();
  const [picture] = pictures.filter((item) => item.id === +thumbnail.dataset.thumbnailId);
  showBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  initThumbnails(pictures);
  container.addEventListener('click', onContainerClick);
};

export { renderGallery };
