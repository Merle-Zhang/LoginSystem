var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//login
router.post('/login', function (req, res, next) {
  var name = req.body.username;
  var pwd = req.body.password;
  var mysql = require('mysql');

  //connect to database
  var connection = mysql.createConnection({
    host: 'localhost',//hostname
    user: 'merle',//username
    password: 'sdcfullstack',//password
    database: 'sdcfullstack'//database
  });

  //validify input
  if (!name || name == "") {
    console.log("username cannot be empty");
    res.send('username cannot be empty');
    return;
  }
  if (!pwd || pwd == "") {
    console.log("password cannot be empty");
    res.send('password cannot be empty');
    return;
  }

  //compare to database
  connection.connect();
  connection.query('SELECT COUNT(*) checkNum FROM `t_user` WHERE name = \'' + name + '\' AND psw =\'' + pwd + '\'', function (err, rows, fields) {
    if (err) throw err;
    var checkNum = rows[0].checkNum;
    console.log('Feedback ', rows[0].checkNum);
    if (checkNum == 0) {
      console.log('Invalid username or password');
      res.send('Invalid username or password');
    } else {
      console.log('Login successful');
      //return result
      res.send('Login successfully, username and password are: ' + name + "---" + pwd);
    }
  });

  //Close connection
  connection.end();
});


//login
router.post('/signup', function (req, res, next) {
  var name = req.body.username;
  var pwd = req.body.password;
  var mysql = require('mysql');

  //connect to database
  var connection = mysql.createConnection({
    host: 'localhost',//hostname
    user: 'merle',//username
    password: 'sdcfullstack',//password
    database: 'sdcfullstack'//database
  });

  //validify input
  if (!name || name == "") {
    console.log("username cannot be empty");
    res.send('username cannot be empty');
    return;
  }
  if (!pwd || pwd == "") {
    console.log("password cannot be empty");
    res.send('password cannot be empty');
    return;
  }

  //compare to database
  connection.connect();
  connection.query('INSERT INTO t_user (name, psw, age, sex) values (\"' + name + '\", \"' + pwd + '\", 1, 1)', function (err, rows, fields) {
    if (err) throw err;
    // var checkNum = rows[0].checkNum;
    // console.log('Feedback ', rows[0].checkNum);
    res.send('Sign up successfully');
   
  });

  //Close connection
  connection.end();
});


module.exports = router;
