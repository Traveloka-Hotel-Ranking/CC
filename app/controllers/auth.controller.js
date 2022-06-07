const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8),
        favCountry: req.body.favCountry,
        favFood: req.body.favFood,
        favMovie: req.body.favMovie
    })
     .then(user => {        
        if (req.body.roles) {
             Role.findAll({
                 where: {
                     name: {
                         [Op.eq]: "user"
                     }
                 }
             }).then(roles => {
                 user.setRoles(roles).then(() => {
                     res.send({ message: "User was registered successfully!" });
                 });
             });
         } else {
            //  User role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
         }
     })
     .catch(err => {
         res.status(500).send({ 
             message: "User failed to register. Please complete the data." 
        });
     });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            [Op.or] : [
                { email: `${req.body.email || ""}`},
                { phone: `${req.body.phone || ""}`},
            ],
        },
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                status: "false",
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret_signin, {
            expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                status: "true",
                message: "success",
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                roles: authorities,
                accessToken: token
            });
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.forgotPassword = (req, res) => {   
    User.findOne({
        where: {
            email: req.body.email,
            [Op.or] : [
                { favCountry: `${req.body.favCountry || ""}`},
                { favFood: `${req.body.favFood || ""}`},
                { favMovie: `${req.body.favMovie || ""}`},
            ],
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        };

        var tokenReset = jwt.sign({ id: user.id }, config.secret_forgotPass, {
            expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                status: "true",
                message: "success",
                id: user.id,
                name: user.name,
                email: user.email,
                roles: authorities,
                accessToken: tokenReset
            });
        });
    })
    .catch(err => {
        res.status(500).send({ 
            message: "Please complete the data." 
        });
    });
};