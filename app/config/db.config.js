module.exports = {
    HOST: "34.101.63.28",
    USER: "root",
    PASSWORD: "traveloka",
    DB: "traveloka",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };