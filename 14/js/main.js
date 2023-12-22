import { renderGallery } from './gallery.js';
import { openEditPopup, setPopupSubmit, closePopup } from './open-big-picture.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFilters } from './filtration-image.js';
import { debounce } from './utils.js';

getData()
  .then((thumbnails) => {
    const debounceRenderGallery = debounce(renderGallery);
    renderGallery(thumbnails);
    initFilters(thumbnails, debounceRenderGallery);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setPopupSubmit(closePopup);

openEditPopup();
