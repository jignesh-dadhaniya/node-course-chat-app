var moment = require('moment');

var generateMessage = (from, txt) => {
  return {from, txt, createAt: moment().valueOf()};
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
