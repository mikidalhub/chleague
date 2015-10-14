var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var jwt = require('./services/jwt.js');
var constants = require('./services/constants.js');
var request = require("request");
var app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User({
        email: user.email,
        password: user.password,
    });
    newUser.save(function (err) {
        createToken(newUser, res);
    });
});
app.post('/login', function (req, res) {
    req.user = req.body;
    console.log(req.user);
    request(constants.getConstant('login') +
            req.user.username + '&password=' +
            req.user.password,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Authentication failed!'});
                res.json(body);
            });
});
app.post('/currenttime', function (req, res) {
    req.user = req.body;
    
    request(constants.getConstant('servertime') + req.user.sessionId,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Authentication failed!'});
                res.json(body);
            });
});
app.post('/validate', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('validate') + req.user.sessionId,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Invalid session!'});
                res.json(body);
            });
});
app.post('/matches', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('matches') + req.user.sessionId, // + userId,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Something went wrong with getMatches!'});
                res.json(body);
            });
});
app.post('/usermatches', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('usermatches') + req.user.sessionId +  // + userId,
            '&userId=' +  req.user.userId,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Something went wrong with getMatches!'});
                res.json(body);
            });
});
app.post('/setusertips', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('setusertip') + req.user.sessionId +  // + &matchID=xxx&tip1=x&tip2=x
            '&matchId=' +  req.user.matchid + 
            '&tip1=' +  req.user.tip1 + 
            '&tip2=' +  req.user.tip2 ,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Something went wrong with set tips!'});
                res.json(body);
            });
});
app.post('/countries', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('countries') + req.user.sessionId, // + userId,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Something went wrong with getMatches!'});
                res.json(body);
            });
});
app.post('/users', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('users') + req.user.sessionId, // + userId,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Something went wrong with getMatches!'});
                res.json(body);
            });
});
app.post('/changepassword', function (req, res) {
    req.user = req.body;
    request(constants.getConstant('changepassword') +
            req.user.sessionId +
            '&password=' + req.user.oldpassword +
            '&newPassword=' + req.user.newpassword,
            function (error, response, body) {
                if (error)
                    return res.status(401).send({message: 'Something went wrong with getMatches!'});
                res.json(body);
            });
});

function createToken(user, res) {
    var payload = {
        sub: user._id
    }
    var token = jwt.encode(payload, "shh..");
    res.status(200).send({
        user: user.toJSON(),
        token: token,
    });
}
;
//mongoose.connect('mongodb://localhost/psJWT');
//console.log(jwt.encode('hi', 'secret'));

var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
});
