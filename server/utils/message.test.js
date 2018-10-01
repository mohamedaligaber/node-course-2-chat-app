const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

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


describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = 12;
        var longitude = 15;
        var url = 'https://www.google.com/maps?q=12,15';

        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
          from: from,
          url: url
        });
    });

});
