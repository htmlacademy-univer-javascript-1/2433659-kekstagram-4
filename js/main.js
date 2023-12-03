import {getPhotos} from './data.js';
import { renderPictures } from './pictures.js';

const photos = getPhotos();

renderPictures(photos);
