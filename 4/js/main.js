
const DESCRIPTION = [
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

const PHOTOS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const randomComments = getRandomInteger(0, 30);

const createDescriptionOfPhoto = (numOfComments) => {
  const randomPhotoId = getRandomInteger(1, 25);
  const randomUrl = getRandomInteger(1, 25);
  const randomDescription = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomLikes = getRandomInteger(12, 200);
  const comments = [];

  for (let i = 0; i<randomComments; i++) {
    const randomIdForComment = getRandomInteger(1, 500);
    const randomAvatar = getRandomInteger(1, 6);
    const randomMessage = getRandomInteger(0, MESSAGES.length - 1);
    const randomName = getRandomInteger(0, NAMES.length - 1);
    comments.push( {
      id: randomIdForComment,
      avatar: 'img/avatar-' + randomAvatar + '.svg',
      message: MESSAGES[randomMessage],
      name: NAMES[randomName],
    });
  }

  return {
    id: randomPhotoId,
    url: 'photos/' + randomUrl + '.jpg',
    description: DESCRIPTION[randomDescription],
    likes: randomLikes,
    comments: comments,
  };
};

const descriptionsOfPhotos = Array.from({length: PHOTOS_COUNT}, createDescriptionOfPhoto);
