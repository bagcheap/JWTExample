/*
Exercise code from https://www.youtube.com/watch?v=7nafaH9SddU
*/
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({message: 'Welcome to the API'});
});

//Protect the post by adding verifyToken function as the middleware
app.post('/api/posts', verifyToken, (req, res) => {

    //verify token asynchronously
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({message: 'Post created...', authData});

        };
    });

});

//Login routine to obtain a JWT
app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        Id: 1,
        Name: 'Gupli',
        Email: 'gupli@home.com'
    }

    jwt.sign({
        user: user
    }, 'secretkey',{expiresIn: '100s'}, (err, token) => {
        res.json({token: token});
    });

});

//FORMAT OF TOKEN: Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    //TOKEN IS STRIPPED OUT OF THE HEADER
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        //split the token
        const bearer = bearerHeader.split(' ');
        // Get the second entry
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //Call the next "middleware"
        next();
    } else {
        //res.sendStatus(403);
        res.json({message: 'You are forbidden, Sir!'});
    };
};

app.listen(5000, () => console.log('Server started on port 5000 - yahoo!'));
