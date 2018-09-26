/*
console.log(__dirname + '/../public');  //here is the old way we use to access any directoy but when the path printed to the console it will look wired.
//it will print the path and the nvaigation (..) so i need another way to navigate throw the terminal and take care about OS compatibilty
//output --> FULL_PATH/server\..\public

//to solve this issue there is a core pakcage of node.js called "Path" take care of this
const path = require('path');
const publicPath = path.join(__dirname + '/../public');

console.log(publicPath);  //here is path is well formated and cross OS compatible

*/

const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname + '/../public');

var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Sevrer is up on ${PORT} port`);
});

//i will deploy this app on heroku so i will add start script in start scripts object in package.json file
//and i will add engines object to specify the node.js version that heroku will deploy my app for.

//push code to github: 1)execute command "git init" on project root directory 2)create github repo.
