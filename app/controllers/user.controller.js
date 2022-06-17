const db = require("../models");
const Hotel = db.hotel;
const User = db.user;
const Facility = db.facility;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: hotel } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, hotel, totalPages, currentPage };
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// get All Hotel
exports.findHotel = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const { limit, offset } = getPagination(page, size);

    Hotel.findAndCountAll({ 
        where: condition, limit, offset,
        include: Facility
     })
    .then(data => {
        const response = getPagingData(data, page, limit)
        res.status(200).send({
            status: "true",
            message: "success",
            response
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Some error occurred while retrieving Hotel."
        });
    });
};

// find By Location
exports.findByLoc = (req, res) => {
  const { page, size, location } = req.query;
  var conditionLoc = location ? { location: { [Op.like]: `%${location}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  Hotel.findAndCountAll({ 
    where: conditionLoc, limit, offset,
    include: Facility
 })
  .then(data => {
      const response = getPagingData(data, page, limit)
      res.send({
          status: "true",
          message: "success",
          response
      });
  })
  .catch(err => {
      res.status(500).send({
          message: "Some error occurred while retrieving Hotel."
      });
  });
};

// find By Rating
exports.findByRat = (req, res) => {
  const review = req.query.review;
  var conditionRat = review ? { review: { [Op.like]: `${review}` } } : null;
  
  Hotel.findAll({ 
    where: conditionRat,
    include: Facility
 })
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
        message: "Error updating Password with email=" + email
      });
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};