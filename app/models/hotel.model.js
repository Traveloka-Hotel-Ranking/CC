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
            type: Sequelize.DOUBLE
        },
        price: {
            type: Sequelize.STRING
        },
        lat: {
            type: Sequelize.DECIMAL(11,10)
        },
        lon: {
            type: Sequelize.DECIMAL(9,6)
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

