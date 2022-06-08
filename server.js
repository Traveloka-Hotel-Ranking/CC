const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const Role = db.role;
const Hotel = db.hotel;
// db.sequelize.sync();

// Production
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hotel Ranking application." });
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });

    Hotel.create({
      name: "Carlton Hotel",
      location: "Singapore"
      // rating: "", // 1 - 5
      // price: "",
      // lat: "",
      // lon: "",
      // image: "",
      // review: "" // 1 - 10
    });

    Hotel.create({
      name: "Royal Plaza on Scotts Hotel",
      location: "Orchard City Center"
      // rating: "",
      // price: "",
      // lat: 1.3071623424894887,
      // lon: 103.83194724391689,
      // image: "",
      // review: ""
    });
}

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});