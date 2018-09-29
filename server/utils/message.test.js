const expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        var from = 'mohamed';
        var text = 'Hi I am mohamed!'
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
          from,
          text
        });
    });
});
