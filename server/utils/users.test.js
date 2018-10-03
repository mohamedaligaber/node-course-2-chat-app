const expect = require('expect');

const {Users} = require('./users');



describe('Users', () => {
  var users;   //i defined it here to accessable inside foreach function and for test cases

  beforeEach( () => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mohamed',
      room: 'NodeCourse'
    }, {
      id: '2',
      name: 'Ali',
      room: 'ReactCourse'
    }, {
      id: '3',
      name: 'Ahmed',
      room: 'NodeCourse'
    }];
  });

  it('should add new user', () => {
      var users = new Users();
      var user = {
        id: '73hjkjdsa837843',
        name: 'Mohamed',
        room: 'OfficeRoom'
      };

      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);  //when expect between arrays or objects use toEqual() function not toBe(), don't forget

  });

  it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
  });

  it('should not reomve user', () => {
      var userId = '100';
      var user = users.removeUser(userId);

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
      var userId = '1';
      var user = users.getUser(userId);

      expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
      var userId = '100';
      var user = users.getUser(userId);

      expect(user).toNotExist();   //  expect(user).toBe(undefined);
  });

  it('should return names for NodeCourse', () => {
      var userList = users.getUsersList('NodeCourse');

      expect(userList.length).toBe(2);
      expect(userList).toEqual(['Mohamed', 'Ahmed']);
  });

  it('should return names for NodeCourse', () => {
      var userList = users.getUsersList('ReactCourse');

      expect(userList.length).toBe(1);
      expect(userList).toEqual(['Ali']);
  });

});
