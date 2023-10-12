const randRoom = () => {
  var result = "";
  var hexChars = "0123456789abcdef";
  for (var i = 0; i < 16; i += 1) {
    result += hexChars[Math.floor(Math.random() * 16)];
  }
  return result;
};

const randFirstPlayer = () => {
  return Math.random() > 0.5 ? 0 : 1;
};

module.exports = { randRoom, randFirstPlayer };
