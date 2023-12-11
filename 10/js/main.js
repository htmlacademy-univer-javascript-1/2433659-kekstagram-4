import { getPhotos } from './data.js';
import { renderGallery } from './gallery.js';
import { openEditPopup } from './edit-popup.js';

const photos = getPhotos();

renderGallery(photos);
openEditPopup();
