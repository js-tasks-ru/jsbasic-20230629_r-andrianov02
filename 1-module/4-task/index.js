function checkSpam(str) {
  strTrue = str.toLowerCase();
  let a = '1xBet'.toLowerCase();
  let b = 'XXX'.toLowerCase();

  if(strTrue.includes(a) || strTrue.includes(b)){
      return true;
  }else{
      return false;
  }
}
