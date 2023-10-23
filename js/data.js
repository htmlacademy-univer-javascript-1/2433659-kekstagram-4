import {getRandomInteger} from './util.js';

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

const NAMES = [
  'Катя',
  'Саша',
  'Андрей',
  'Гена',
  'Кирилл',
  'Алёна',
];

const AvatarId = {
  MIN: 1,
  MAX: 6,
};

const MessagesCount = {
  MIN: 1,
  MAX: 2,
};

const CommentsCount = {
  MIN: 0,
  MAX: 30,
};

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const MAX_COUNT_PHOTOS = 25;

const getComment = (_, id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(AvatarId.MIN, AvatarId.MAX)}.svg`,
  message: MESSAGES.slice(0, getRandomInteger(MessagesCount.MIN, MessagesCount.MAX)),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const getPhotoData = (_, id)=> ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from({length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, (getComment)),
});

const getPhotos = () => Array.from({length: MAX_COUNT_PHOTOS}, getPhotoData);

export {getPhotos};
