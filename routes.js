/*jshint esversion: 8 */

const Health = require("./configurations/healthConfig");
const Users = require("./configurations/userConfig");

module.exports = [
  // Health
  {
    method: "GET",
    path: "/health",
    config: Health.getHealth
  },
  // Users
  {
    method: "GET",
    path: "/v1/users",
    config: Users.ReadAll
  },
  {
    method: "GET",
    path: "/v1/users/{userId}",
    config: Users.Read
  },
  {
    method: "POST",
    path: "/v1/users",
    config: Users.Create
  },
  {
    method: "PUT",
    path: "/v1/users/{userId}",
    config: Users.Update
  },
  {
    method: "DELETE",
    path: "/v1/users/{userId}",
    config: Users.Delete
  }
];