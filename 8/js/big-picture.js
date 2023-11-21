const COMMENT_COUNTER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentsList = document.querySelector('.social__comments');
const socialCommentsItem = document.querySelector('.social__comment');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const socialCommentsCount = document.querySelector('.social__comment-count');

let comments = [];
let showingComments = 0;

const fillCommentCount = () => {
  socialCommentsCount.innerHTML = `${showingComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const createComment = (comment) => {
  const commentTemplate = socialCommentsItem.cloneNode(true);
  const img = commentTemplate.querySelector('.social__picture');
  commentTemplate.querySelector('.social__text').textContent = comment.message;
  img.src = comment.avatar;
  img.alt = comment.name;
  return commentTemplate;
};

const renderComments = () => {
  const currentComments = comments.slice(showingComments, showingComments + COMMENT_COUNTER);
  showingComments += COMMENT_COUNTER;
  showingComments = Math.min(showingComments, comments.length);
  currentComments.forEach((comment) => socialCommentsList.append(createComment(comment)));
  fillCommentCount();
  if (showingComments >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
  socialCommentsLoader.classList.remove('hidden');
};

const fillBigPicture = (item) => {
  socialCaption.textContent = item.description;
  bigPictureImg.alt = item.description;
  bigPictureImg.src = item.url;
  likesCount.textContent = item.likes;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
  comments = [];
  showingComments = 0;
};

const openBigPicture = (item) => {
  socialCommentsList.innerHTML = '';
  comments = item.comments;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fillBigPicture(item);
  renderComments();
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onSocialCommentsLoaderClick(evt) {
  evt.preventDefault();
  renderComments();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onBigPictureCancelClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}

export { openBigPicture };
