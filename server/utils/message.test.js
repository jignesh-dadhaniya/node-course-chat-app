var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Harry';
    var txt  = "Some message";
    var message = generateMessage(from, txt);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      txt
    });



  });
})
