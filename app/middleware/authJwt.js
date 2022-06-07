const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyTokenHotel = (req, res, next) => {
    let token = req.headers["x-access-token-hotel"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret_signin, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decode.id;
        next();
    });
};

verifyTokenReset = (req, res, next) => {
    let tokenReset = req.headers["x-access-token-reset"];
    if (!tokenReset) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(tokenReset, config.secret_forgotPass, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decode.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator Role!"
            });
            return;
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

isUser = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "user") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require User Role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyTokenHotel: verifyTokenHotel,
    verifyTokenReset: verifyTokenReset,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
    isUser: isUser
};

module.exports = authJwt;