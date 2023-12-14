import { getRandomNumber, createIdGenerator } from './utils.js';
const descriptionId = createIdGenerator();
const photoId = createIdGenerator();
const commentId = createIdGenerator();
const COUNT_PHOTOS = 25;

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const AvatarId = {
  MIN: 1,
  MAX: 6
};

const MessagesCount = {
  MIN: 1,
  MAX: 2
};

const NAMES = [
  'Катя',
  'Саша',
  'Андрей',
  'Гена',
  'Кирилл',
  'Алёна',
];

const DESCRIPTIONS = [
  'Море',
  'Котик на солнце',
  'Как хорошо в лесу летом',
  'Улыбаюсь',
  'Звёздная ночь',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getTextForComment = () => Array.from(
  { length: getRandomNumber (MessagesCount.MIN, MessagesCount.MAX) },
  () => (MESSAGES[getRandomNumber(0, MESSAGES.length - 1)])).join(' ');

const getComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomNumber(AvatarId.MIN,AvatarId.MAX)}.svg`,
  message: getTextForComment(),
  name: NAMES[getRandomNumber(0, NAMES.length - 1)]
});

const getPhotoDescription = () => ({
  id: descriptionId(),
  url: `photos/${photoId()}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from({length: getRandomNumber(CommentsCount.MIN, CommentsCount.MAX)}, getComment),
});

const getPhotos = () => Array.from({length:COUNT_PHOTOS}, getPhotoDescription);

export { getPhotos };
