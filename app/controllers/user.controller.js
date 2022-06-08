const db = require("../models");
const Hotel = db.hotel;
const User = db.user;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// get All Hotel
exports.userBoard = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Hotel.findAll({ where: condition })
    .then(data => {
        res.send({
            status: "true",
            message: "success",
            data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Some error occurred while retrieving Hotel."
        });
    });
};

// get Hotel by Id
exports.findById = (req, res) => {
    const id = req.params.id;
    Hotel.findByPk(id)
    .then(data => {
        if (data) {
            res.status(200).send({
                status: "true",
                message: "success",
                data
            });
        } else {
            res.status(404).send({
                message: `Cannot find Hotel with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error Retrieving Hotel with id =" + id
        });
    });
};

exports.resetPassword = (req, res) => {
  const email = req.body.email;
  User.update({
    password: bcrypt.hashSync(req.body.password, 8),
  }, { where: { email: email } }
  )
    .then(user => {
      if (user == 1) {
        res.status(200).send({
            status: "true",
            message: "User was updated successfully."
        });
      } else {
        res.status(404).send({
            status: "false",
            message: `Cannot update Password with email=${email}. Maybe email was not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + email
      });
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};