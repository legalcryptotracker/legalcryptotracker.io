function getResetPasswordCode() {
  var search = new URLSearchParams(location.search);
  return search.get('code');
}

export default getResetPasswordCode;
