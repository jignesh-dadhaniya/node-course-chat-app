var generateMessage = (from, txt) => {
  return {from, txt, createAt: new Date().getTime()};
};

module.exports = {generateMessage};
