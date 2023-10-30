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

const isMeetingWithinWorkingDay = (startOfWorkingDay, endOfWorkingDay, startOfMeeting, duration) =>  {
  const startWorkingDayMinutes = Number(startOfWorkingDay.split(':')[0]) * 60 + Number(startOfWorkingDay.split(':')[1]);
  const endWorkingDayMinutes = Number(endOfWorkingDay.split(':')[0]) * 60 + Number(endOfWorkingDay.split(':')[1]);
  const startMeetingMinutes = Number(startOfMeeting.split(':')[0]) * 60 + Number(startOfMeeting.split(':')[1]);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startWorkingDayMinutes <= startMeetingMinutes && endMeetingMinutes <= endWorkingDayMinutes;
};

isMeetingWithinWorkingDay('08:00', '17:30', '14:00', 90);
