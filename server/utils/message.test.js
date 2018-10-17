const expect = require('expect');
const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from  = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from , text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    })
})

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        let from = 'Admin';
        let lat  = 15;
        let lng = 15;
        let url = 'https://www.google.com/maps?q=15,15';
        let message = generateLocationMessage(from , lat, lng);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    })
})