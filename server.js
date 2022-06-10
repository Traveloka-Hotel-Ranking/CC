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

    // Insert Hotel
    Hotel.create({
      name: "Carlton Hotel Singapore",
      location: "76 Bras Basah Rd, Singapore 189558",
      rating: 5, // 1 - 5
      price: "3.357.426",
      lat: 1.29604,
      lon: 103.85274,
      image: "https://storage.googleapis.com/traveloka-hotel/Carlton-Hotel-Singapore.jpg",
      review: 8.5 // 1 - 10
    });

    Hotel.create({
      name: "Royal Plaza on Scotts Hotel",
      location: "Orchard City Center",
      rating: 4.5,
      price: "3.450.123",
      lat: 1.30698,
      lon: 103.83196,
      image: "https://storage.googleapis.com/traveloka-hotel/Royal-Plaza-on-Scotts-Hotel.jpg",
      review: 8.5
    });

    Hotel.create({
      name: "Hilton Singapore Orchard",
      location: "333 Orchard Road, Orchard, Singapore, 238867",
      rating: 5,
      price: "7.701.339",
      lat: 1.30194,
      lon: 103.83586,
      image: "https://storage.googleapis.com/traveloka-hotel/Hilton-Singapore-Orchard.jpg",
      review: 8.7
    });

    Hotel.create({
      name: "York Hotel",
      location: "21 Mount Elizabeth, Orchard, Singapore, 228516",
      rating: 4,
      price: "2.527.481",
      lat: 1.30719,
      lon: 103.83553,
      image: "https://storage.googleapis.com/traveloka-hotel/York-Hotel.jpg",
      review: 8.5 
    });

    Hotel.create({
      name: "Aerotel Singapore Transit Hotel @ Changi Terminal 1",
      location: "Singapore Changi Airport, Changi, Singapore, 819642",
      rating: 3,
      price: "2.355.085",
      lat: 1.36213,
      lon: 103.99005,
      image: "https://storage.googleapis.com/traveloka-hotel/Aerotel-Singapore-Transit-Hotel-%40-Changi-Terminal-1.jpg",
      review: 8.3 
    });

    Hotel.create({
      name: "Orchard Hotel Singapore",
      location: "442 Orchard Road, Orchard, Singapore, 238879",
      rating: 5,
      price: "2.974.845",
      lat: 1.30751,
      lon: 103.82861,
      image: "https://storage.googleapis.com/traveloka-hotel/Orchard-Hotel-Singapore.jpg",
      review: 8.5
    });

    Hotel.create({
      name: "ibis budget Singapore Crystal",
      location: "50 Lorong 18 Geylang, Geylang, Singapore, 398824 ",
      rating: 2,
      price: "1.053.643",
      lat: 1.31063,
      lon: 103.88062,
      image: "https://storage.googleapis.com/traveloka-hotel/ibis-budget-Singapore-Crystal.jpg",
      review: 8.2
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