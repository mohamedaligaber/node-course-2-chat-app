const expect = require('expect');

const {isRealString} = require('./validations.js');

describe('isRealString', () => {

  it('should reject non-string values', () => {
      var res = isRealString(98);
      expect(res).toBe(false);
  });

  it('should reject non-string values', () => {
      var res = isRealString('    ');
      expect(res).toBe(false);
  });

  it('should allow string with non-spaces characters', () => {
      var res = isRealString('Mohamed   Ali');
      expect(res).toBe(true);
  });

});
