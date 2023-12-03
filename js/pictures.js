import { showBigPicture } from './big-picture.js';
import { thumbnailsInit } from './thumbnail.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = (picutres) => {
  pictureTemplate.addEventListener('click', (evt) => {
    evt.preventDefault();

    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if(!thumbnail) {

      return;
    }
    const [picture] = picutres.filter((item) => item.id === +thumbnail.dataset.thumbnailId);
    showBigPicture(picture);
  });

  thumbnailsInit(picutres);
};

export { createPictures };
