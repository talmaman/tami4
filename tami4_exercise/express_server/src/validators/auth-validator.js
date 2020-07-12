const AppError = require('../models/apperror');
const authService = require('../services/auth.service');

exports.signInValidator = (req, res, next) => {
    if (!req.body.username || !req.body.password)
        return next(new AppError("Missing required arguments", 400));
    return next();
};

exports.signUpValidator = (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.email)
        return next(new AppError("Missing required arguments", 400));
    return next();
};

exports.isAuthenticated = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) throw new Error();

        const bearer = bearerHeader.split('Bearer ').pop();
        await authService.VerifyToken(bearer);
        return next();
    }
    catch(err) {
        return next(new AppError("You are not authorized", 401));
    }
};