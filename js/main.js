import {getPhotos} from './data.js';
import { showBigPicture } from './big-picture.js';
import {thumbnailsInit} from './thumbnails.js';

const photos = getPhotos();

showBigPicture(photos);
thumbnailsInit(photos);
