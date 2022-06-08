module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotels", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        },
        lat: {
            type: Sequelize.FLOAT
        },
        lon: {
            type: Sequelize.FLOAT
        },
        image: {
            type: Sequelize.STRING
        },
        review: {
            type: Sequelize.DOUBLE
        }
    });
    return Hotel;
};

