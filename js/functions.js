/*
const checkStringLength = (string, lengthString) => string.length <= lengthString;

const isPalindrom = (string) => {
  let stringByContrast = '';
  for (let i = (string.length - 1); i >= 0; i--){
    stringByContrast += string[i];
  }

  return string === stringByContrast;
};

checkStringLength('кот', 4);
isPalindrom('кот');
*/

const meetingTimeCalculation = (beginnings, ends, meetings, times) => {
  const beginning = beginnings.split(':');
  const meeting = meetings.split(':');
  const end = ends.split(':');
  const hours = Math.floor(times/60);
  const minutes = times%60;
  let result = false;

  if (Number(beginning[0]) <= (Number(meeting[0]) + hours) && (Number(meeting[0]) + hours) <= Number(end[0])) {
    if (Number(beginning[1]) <= (Number(meeting[1]) + minutes) && (Number(meeting[1]) + minutes) <= Number(end[1])) {
      result = true;
    }
  }

  return result;
};

meetingTimeCalculation();
