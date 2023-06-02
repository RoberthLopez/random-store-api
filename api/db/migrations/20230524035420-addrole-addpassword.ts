"use strict";
import { QueryInterface, Sequelize } from "sequelize";
import { userModel } from "../models/user.model";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.addColumn("users", "password", userModel.password);
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
