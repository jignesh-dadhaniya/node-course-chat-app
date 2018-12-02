var expect = require('expect');
var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Harry';
    var txt  = "Some message";
    var message = generateMessage(from, txt);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({
      from,
      txt
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {

    var from = 'Dev';
    var latitude = 15;
    var longitude = 19;

    var url = "https://www.google.com/maps?q=15,19";
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from, url});
  });
});
