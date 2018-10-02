const moment = require('moment');

var generateMessage = (from, text) => {
    return {
      from,
      text,
      createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,    //this is google maps service which takes latitude and longitude in this url format and return your address information
      createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};
