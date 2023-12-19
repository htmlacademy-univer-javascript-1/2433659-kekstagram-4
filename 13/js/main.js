import { renderGallery } from './gallery.js';
import { openEditPopup, setPopupSubmit, closePopup } from './open-big-picture.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData()
  .then((thumbnails) => {
    renderGallery(thumbnails);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setPopupSubmit(closePopup);

openEditPopup();
