var generateMessage = (from, txt) => {
  return {from, txt, createAt: new Date().getTime()};
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};
