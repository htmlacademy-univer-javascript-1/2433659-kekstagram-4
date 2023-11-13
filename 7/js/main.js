import {getPhotos} from './data.js';
getPhotos();

import { thumbnailsInit } from './thumbnails.js';
thumbnailsInit(getPhotos());
