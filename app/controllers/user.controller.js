const db = require("../models");
const Hotel = db.hotel;
const Op = db.Sequelize.Op;

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

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};