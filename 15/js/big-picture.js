import { isEscapeKey } from './utils.js';
const COMMENT_STEP = 5;
let commentsShown = 0;
let comments = null;

const documentBody = document.querySelector('body');
const bigPictureElement = documentBody.querySelector('.big-picture');
const commentsList = documentBody.querySelector('.social__comments');
const commentListElement = documentBody.querySelector('.social__comment');
const cancelButtonElement = documentBody.querySelector('.big-picture__cancel');
const totalCommentsElement = documentBody.querySelector('.comments-count');
const commentsShownElement = documentBody.querySelector('.comments-shown');
const commentsLoaderElement = documentBody.querySelector('.comments-loader');

const createComment = ( {avatar, name, message} ) => {
  const comment = commentListElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsList.innerHTML = '';

  commentsShown += COMMENT_STEP;
  if (commentsShown >= comments.length) {
    commentsShown = comments.length;
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    commentsList.appendChild(comment);
  }
  commentsShownElement.textContent = commentsShown;
  totalCommentsElement.textContent = comments.length;
};

const onCommentsLoaderElementClick = () => {
  renderComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderElementClick);
  commentsShown = 0;
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCancelButtonClick () {
  closeBigPicture();
}

const renderPictureDetails = ( { url, likes, description} ) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureElement.querySelector('.big-picture__img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
  renderPictureDetails(data);
  comments = data.comments.slice();
  renderComments(comments);
};

export { showBigPicture };
