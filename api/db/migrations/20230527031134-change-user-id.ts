"use strict";
import { QueryInterface, Sequelize } from "sequelize";
import { DataType } from "sequelize-typescript";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.changeColumn("customers", "user_id", {
      allowNull: true,
      type: DataType.INTEGER,
      field: "user_id",
      unique: true,
    });
    /**
     * Add altering commands here.
     20230524035420-addrole-addpassword*
     * Example:

     */
  },

  // async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
  //   await queryInterface.removeColumn("users", "role");
  //   /**
  //    * Add reverting commands here.
  //    *
  //    * Example:
  //    * await queryInterface.dropTable('users');
  //    */
  // },
};
