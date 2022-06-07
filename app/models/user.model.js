module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        favCountry: {
            type: Sequelize.STRING(50)
        },
        favFood: {
            type: Sequelize.STRING(50)
        },
        favMovie: {
            type: Sequelize.STRING(50)
        }
    });
    return User;
};