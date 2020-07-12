const express = require('express');
const bcrypt = require('bcryptjs');
const userService = require('../../services/user.service');
const authService = require('../../services/auth.service');
const validators = require('../../validators/auth-validator');
const User = require('../../models/user');
const AppError = require('../../models/apperror');

const router = express.Router();

router.post('/signin', validators.signInValidator, async (req, res, next) => {
    try {
        const user = await userService.GetUser(req.body.username);

        if (!user || !await bcrypt.compare(req.body.password, user.password))
            throw new AppError("Wrong username or password", 404);

        return res.json({
            success: true,
            token: await authService.CreateToken(user)
        });
    }
    catch (err) {
        return next(err);
    }
});

router.post('/signup', validators.signUpValidator, async (req, res, next) => {
    try {
        const user = new User(req.body);
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        await userService.InsertUser(user);
        return res.json({
            success: true,
            token: await authService.CreateToken(user)
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;