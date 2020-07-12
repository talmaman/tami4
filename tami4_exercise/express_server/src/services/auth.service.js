const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.VerifyToken = (token) => {
    return new Promise((res, rej) => {
        try {
            const dec = jwt.verify(token, config.secret);
            return res(dec);
        }
        catch (err) {
            return rej(err);
        }
    });
};

exports.CreateToken = (user) => {
    return new Promise((res, rej) => {
        try {
            const token = jwt.sign({ user: user }, config.secret, { expiresIn: config.tokenExpires });
            return res(token);
        }
        catch (err) {
            return rej(err);
        }
    });
};