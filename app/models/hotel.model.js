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
        }
    });
    return Hotel;
};

