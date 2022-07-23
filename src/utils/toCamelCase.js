function toCamelCase(string, prefix) {
  var key = prefix || '';
  key += string[0].toUpperCase();
  string = string.substring(1);
  var i = 0;
  while (i < string.length) {
    if (string[i] == ' ') { key += string[i+1].toUpperCase(); i++; }
    else { key += string[i]; }
    i++;
  }
  return key;
}

export default toCamelCase;
