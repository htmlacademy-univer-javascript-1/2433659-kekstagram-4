import { getPhotos } from './data.js';
import { renderGallery } from './gallery.js';
import { openEditPopup } from './open-big-picture.js';

const photos = getPhotos();

renderGallery(photos);
openEditPopup();
