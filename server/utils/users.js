// users array will contains list of users objects like this :
[{
  id: 'Smj#$asd8jakfd',  //it will be the socketid
  name: 'Mohamed',
  room: 'A'
}]


//function addUser(id, name, room)
//function removeUser(id)
//function getUser(id)

//function getUsersList()

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};   //don't forget ES6 syntax { id: id, name: name, room: room }
    this.users.push(user);
    return user;
  }

  removeUser (id) {
     var user = this.getUser(id);

     if (user) {
       this.users = this.users.filter( (user) => user.id !== id );  //filter will return list of users without the deleted element
     }

     return user;
  }

  getUser (id) {
    return this.users.filter( (user) => user.id === id )[0];  //should return only one object user if exist, or undefined if not exist with id

    //when access first index [0] from empty array it return undefined
  }

  //returns list of users which inside room argument
  getUsersList (room) {
      var users = this.users.filter( (user) => user.room === room );   //ES6 arrow function when contains only one return line, it equals to (user) => { return user.room === room;  }
      //i want to return list of usernames only not the user objects
      var namesArray = users.map( (user) => user.name );   //map returns users array with element name only

      return namesArray;
  }
}

module.exports = {
  Users
}



/*

//ES6 classes is like Java classes exactly and can has constructors with or without arguments like Java, we instantiate objects from classes with new keyword like Java
//ES6 clesses can has functions like Java classes exactly.
class Person{
  constructor(name, age) {
      this.name = name;
      this.age = age;
  }

  getUserDescribtion () {
    console.log(`${this.name} is ${this.age} years old`);
  }
}


var me = new Person('mohamed', 23);
me.getUserDescribtion();

*/
