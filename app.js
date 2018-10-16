const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const Userschema = require('./models/users');

const users_db = mongoose.createConnection('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true
});

const users = users_db.model('users', Userschema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/users/authorization', (req, res) => {
  if(req.body.name && req.body.username && req.body.password) {
    users.create({
      name: req.body.name,
      age: req.body.age,
      username: req.body.username,
      password: req.body.password
    }, (err, data) => {
      if(err) {
        return res.send('Server error');
      }
      return res.send('Success please sign in');
    });
  } else {
    return res.send('Invalid form data');
  }

});

app.post('/users/signin', (req, res) => {
  users.findOne({username: req.body.username}, (err, user) => {
    if(err) {
      return res.send('Server error');
    }
    if(user.password == req.body.password) {
      users.updateOne({username: req.body.username}, {$set: {signed: true}}).exec();
      return res.send({'users API key ': user.APIkey});
    } else {
      return res.send('Password incorect');
    }
  });
});

app.get('/users/logout/:key', (req, res) => {
  users.updateOne({APIkey: req.params.key}, {$set: {signed: false}}).exec();
  res.send('You are log out');
});

app.listen(8000);
