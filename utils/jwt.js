const BadRequestError = require('../errors/bad-request');
const jwt = require('jsonwebtoken');

exports.generateAccessToken = (payload,_id) => {
    return jwt.sign({ email: payload,id:_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.generateAccessToken1 = (payload, pass) => {
    return jwt.sign(
        { username: payload, password: pass },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

exports.verifyToken = (token) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) throw new BadRequestError('Invalid Token');
            resolve(decoded);
        });
    });
};
