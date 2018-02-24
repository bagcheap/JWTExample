# JWTExample
Neat example of using JWT
This example was build using instructions from node_jwt_example/app.js
You can watch the YouTube video of this https://www.youtube.com/watch?v=7nafaH9SddU

// ---------- High Level of the Code ------------------

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
  //implement code here
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
  //implement code here
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
  //implement code here
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  //implement code here
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));
