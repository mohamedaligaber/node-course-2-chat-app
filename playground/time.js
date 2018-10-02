//the integer times stampes is the number of milliseconds from UNIX creation "jan 1st 1970 00:00:00 am"
//the postive values represent the number of milliseconds after of the UNIX creation timestamp --> 1000 one second after UNIX creation timestamp (jan 1st 1970 00:00:01 am)
//the postive values represent the number of milliseconds before of the UNIX creation timestamp --> -1000 one second before UNIX creation timestamp (dec 30st 1969 11:59:59 pm)
// 0 represents the UNIX creation timestamp exactly "jan 1st 1970 00:00:00 am"
// 10000 means ten seconds after UNIX creation timestamp (jan 1st 1970 00:00:10 am)


//there is object called Date(new Date()) i can access it to access the month, day or timestamp of the current timestamp, but it's limited i can not make more manipulation like
//i can get the number of the month but i can not get the name of the month, i can get the number of the day of the month but i can not get it like 1st,2nd..
//you can access MDN to read documentation about this object "Date".

//var date = new Date();
//console.log(date.getMonth()+ 1);

//i can do more playground with the dates and timestamps with a great framework called "momnet", "npm i moment --save"
const moment = require('moment');
var date = moment();  //get new moment object of the current date
//console.log(date.format());  //i can pass same patterns to this format function to change the format of the date returned
console.log(date.format('MMM'));    //will return the month name in 3 chars format like: Sep, Oct, Jan
console.log(date.format('MMM YYYY'));    // Oct 2018

//go to momnetjs.com to read the documentation of moment. you will find all the patterns you want it's pretty simple.

//display section to format the dates.
console.log(date.format('MMM Do, YYYY'));  // Oct 1st 2018

//manipulate section of dates and timestamps manipulation like add and subtract
date.add(1, 'years');
console.log(date.format('MMM Do, YYYY'));  // Oct 1st 2019

date.subtract(2, 'years');
console.log(date.format('MMM Do, YYYY'));  // Oct 1st 2017

date.subtract(2, 'months');
console.log(date.format('MMM Do, YYYY'));  // Aug 1st 2017

date = moment();   //reset the date variable to the current date

// 10:35 am
console.log(date.format('hh:mm a'));

// 6:01 am
console.log(date.format('h:MM a'));


//get current timestamp in unix milliseconds format from moment
var currentTimestamp = moment().valueOf();
console.log(currentTimestamp);

//convert UNIX timestamp to my format by moment
date = moment(currentTimestamp);
console.log(date.format('hh:mm a'));
