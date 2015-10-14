var crypto = require('crypto'); //it's like a bcrypt to encrypt such a code
exports.encode = function (payload, secret) {
    algorithm = 'HS256';
    var header = {
        typ: 'JWT',
        alg: algorithm
    };
    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload)); //header + payload + signature(header + payload)
    return jwt + '.' + sign(jwt, secret);
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function base64Encode(str) {
    return new Buffer(str).toString('base64');
}
