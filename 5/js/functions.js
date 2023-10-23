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
