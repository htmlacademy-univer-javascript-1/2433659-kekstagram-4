import { renderGallery } from './gallery.js';
import { openEditPopup, setFormSubmit, closePopup } from './open-big-picture.js';
import { getData } from './api.js';
import { showAlert, debounce } from './utils.js';
import { initFilters } from './filtration.js';

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


setFormSubmit(closePopup);

openEditPopup();
