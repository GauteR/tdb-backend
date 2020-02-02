/*jshint esversion: 8 */

const Health = require("./configurations/healthConfig");
const Users = require("./configurations/userConfig");
const Raids = require("./configurations/raidConfig");
const Authentication = require("./configurations/authConfig");

module.exports = [
  // Authentication
  {
    method: "POST",
    path: "/auth",
    config: Authentication.AuthenticateUser
  },
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
  },
  // Raids
  {
    method: "GET",
    path: "/v1/raids",
    config: Raids.ReadAll
  },
  {
    method: "GET",
    path: "/v1/raids/{raidId}",
    config: Raids.Read
  },
  {
    method: "POST",
    path: "/v1/raids",
    config: Raids.Create
  },
  {
    method: "PUT",
    path: "/v1/raids/{raidId}",
    config: Raids.Update
  },
  {
    method: "DELETE",
    path: "/v1/raids/{raidId}",
    config: Raids.Delete
  },
];