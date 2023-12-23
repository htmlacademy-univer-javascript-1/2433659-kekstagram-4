const RANDOM_NUMBER_PHOTOS = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const HIDDEN_CONTAINER_CLASS = 'img-filters--inactive';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const bodyElement = document.querySelector('body');
const imageFiltres = bodyElement.querySelector('.img-filters');
const filtersButtons = bodyElement.querySelectorAll('.img-filters__button ');

let activeFilter = Filter.DEFAULT;
let pictures = [];
let callback = null;

const shufflePictures = (array) => array.sort(() => Math.random() - 0.5);

const sortComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const overrideActiveElement = (clickElement) => {
  const activeElement = bodyElement.querySelector(`.${ACTIVE_FILTER_CLASS}`);
  activeElement.classList.remove(ACTIVE_FILTER_CLASS);
  clickElement.target.classList.add(ACTIVE_FILTER_CLASS);
};

const filterFunction = {
  [Filter.DEFAULT]: () => [...pictures],
  [Filter.RANDOM]: () => shufflePictures([...pictures]).slice(0 ,RANDOM_NUMBER_PHOTOS),
  [Filter.DISCUSSED]: () => [...pictures].sort(sortComments)
};

const showImageFiltres = () => {
  imageFiltres.classList.remove(HIDDEN_CONTAINER_CLASS);
};

const onFilterButtonClick = (evt) => {
  const id = evt.target.id;

  if (id !== activeFilter) {
    overrideActiveElement(evt);
    activeFilter = id;
    if (callback) {
      callback(filterFunction[activeFilter]());
    }
  }
};

const initFilters = (data, cb) => {
  pictures = [...data];
  callback = cb;
  showImageFiltres();
  filtersButtons.forEach((filterButton) => filterButton.addEventListener('click', onFilterButtonClick));
  callback([...pictures]);
};

export { initFilters };
