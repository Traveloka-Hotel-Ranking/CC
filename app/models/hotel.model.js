module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotels", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(65)
        },
        location: {
            type: Sequelize.STRING(26)
        },
        rating: {
            type: Sequelize.DOUBLE
        },
        price: {
            type: Sequelize.STRING(10)
        },
        lat: {
            type: Sequelize.DECIMAL(11,10)
        },
        lon: {
            type: Sequelize.DECIMAL(9,6)
        },
        image: {
            type: Sequelize.STRING(218)
        },
        review: {
            type: Sequelize.DOUBLE
        }
    },{ timestamps: false });
    return Hotel;
};