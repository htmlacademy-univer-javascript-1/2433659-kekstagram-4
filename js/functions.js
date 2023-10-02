var checkLength = function (string, length){
  if (string.length<=length){
    return true;
  };

  return false;
};

var isPalindrom = function (string){
  let stringByContrast = '';
  for (let i=(string.length-1); i>=0; i--){
    stringByContrast += string[i];
  };

  if (string === stringByContrast){

    return true;
  };

  return false;
};

checkLength('кот', 4);
isPalindrom('кот');
