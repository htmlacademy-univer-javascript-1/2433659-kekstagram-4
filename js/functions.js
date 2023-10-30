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

const isMeetingWithinWorkingDay = (startWorkingDay, endWorkingDay, startMeeting, duration) =>  {
  const startWorkingDayMinutes = Number(startWorkingDay.split(':')[0]) * 60 + Number(startWorkingDay.split(':')[1]);
  const endWorkingDayMinutes = Number(endWorkingDay.split(':')[0]) * 60 + Number(endWorkingDay.split(':')[1]);
  const startMeetingMinutes = Number(startMeeting.split(':')[0]) * 60 + Number(startMeeting.split(':')[1]);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startWorkingDayMinutes <= startMeetingMinutes && endMeetingMinutes <= endWorkingDayMinutes;
};

isMeetingWithinWorkingDay();
