module.exports = (sequelize, Sequelize) => {
    const Facility = sequelize.define("facility", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      standard_bed: {
        type: Sequelize.INTEGER
      },
      medium_bed: {
        type: Sequelize.INTEGER
      },
      king_bed: {
        type: Sequelize.INTEGER
      },
      ac: {
        type: Sequelize.BOOLEAN
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      breakfast: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lunch: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dinner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },{ timestamps: false });
    return Facility;
};