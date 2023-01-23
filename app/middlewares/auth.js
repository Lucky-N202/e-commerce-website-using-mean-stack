const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        if (!userId) {
            throw 'Invalid user ID';
        } else {
            User.findById(userId)
                .then(user => {
                    if (!user) {
                        throw 'Invalid user ID';
                    } else {
                        req.user = user;
                        next();
                    }
                })
                .catch(error => res.status(401).json({ error }));
        }
    } catch {
        res.status(401).json({ error: 'Invalid request!' });
    }
};

exports.authRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(401).json({ error: 'Not authorized!' });
        }
    };
};