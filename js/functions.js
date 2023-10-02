const checkLength = function(string, length){
  if (string.length<=length){
    return true;
  }
  return false;
};

//console.log(checkLength('проверяемая строка', 10));

const isPalindrom = function(string){
  let stringByContrast = '';
  for (let i=(string.length-1); i>=0; i--){
    stringByContrast += string[i];
  };

  if (string === stringByContrast){
    return true;
  }
  return false;
};

console.log(isPalindrom('топот'));
