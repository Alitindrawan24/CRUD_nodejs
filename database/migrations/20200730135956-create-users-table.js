'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type:Sequelize.STRING,
		},
		email: {
			type:Sequelize.STRING,
		},
		password: {
			type:Sequelize.STRING,
		},
		created_at: {
			allowNull: false,
			type: Sequelize.DATE,
			defaultValue: Sequelize.fn('NOW')
		},
		updated_at: {
			allowNull: false,
			type: Sequelize.DATE,
			defaultValue: Sequelize.fn('NOW')
		}
	});
  },

  down: async (queryInterface, Sequelize) => {
	 return queryInterface.dropTable('users');
  }
};
