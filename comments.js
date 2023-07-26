// Create web server

// 1. Import express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const jsonParser = bodyParser.json();

// 2. Create an app
const app = express();

// 3. Create a static server
app.use(express.static(path.join(__dirname, 'public')));

// 4. Set up routes
app.get('/api/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/comments', jsonParser, (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      const comments = JSON.parse(data);
      const newComment = {
        id: Date.now(),