/*jshint esversion: 8 */

const Health = require("./configurations/healthConfig");
const Users = require("./configurations/userConfig");
const Raids = require("./configurations/raidConfig");
const Chars = require("./configurations/characterConfig");
const Races = require("./configurations/raceConfig");
const Statuses = require("./configurations/statusConfig");
const Specs = require("./configurations/specConfig");
const Authentication = require("./configurations/authConfig");
const Funny = require("./configurations/funnyConfig");

module.exports = [
  // Misc
  {
    method: "GET",
    path: "/inspire",
    config: Funny.GetQuote
  },
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
  {
    method: "GET",
    path: "/v1/raids/{raidId}/invites",
    config: Raids.GenerateInvites
  },
  {
    method: "POST",
    path: "/v1/raids/{raidId}/invites",
    config: Raids.Signup
  },
  {
    method: "PUT",
    path: "/v1/raids/{raidId}/invites/{charId}/manage",
    config: Raids.ManageSignup
  },
  // Characters
  {
    method: "GET",
    path: "/v1/chars",
    config: Chars.ReadAll
  },
  {
    method: "GET",
    path: "/v1/chars/{charId}",
    config: Chars.Read
  },
  {
    method: "POST",
    path: "/v1/chars",
    config: Chars.Create
  },
  {
    method: "PUT",
    path: "/v1/chars/{charId}",
    config: Chars.Update
  },
  {
    method: "DELETE",
    path: "/v1/chars/{charId}",
    config: Chars.Delete
  },
  // Races
  {
    method: "GET",
    path: "/v1/races",
    config: Races.ReadAll
  },
  {
    method: "GET",
    path: "/v1/races/{raceId}",
    config: Races.Read
  },
  {
    method: "POST",
    path: "/v1/races",
    config: Races.Create
  },
  {
    method: "PUT",
    path: "/v1/races/{raceId}",
    config: Races.Update
  },
  {
    method: "DELETE",
    path: "/v1/races/{raceId}",
    config: Races.Delete
  },
  // Specs
  {
    method: "GET",
    path: "/v1/specs",
    config: Specs.ReadAll
  },
  {
    method: "GET",
    path: "/v1/specs/{specId}",
    config: Specs.Read
  },
  {
    method: "POST",
    path: "/v1/specs",
    config: Specs.Create
  },
  {
    method: "PUT",
    path: "/v1/specs/{specId}",
    config: Specs.Update
  },
  {
    method: "DELETE",
    path: "/v1/specs/{specId}",
    config: Specs.Delete
  },
  // Specs
  {
    method: "GET",
    path: "/v1/statuses",
    config: Statuses.ReadAll
  },
  {
    method: "GET",
    path: "/v1/statuses/{statusId}",
    config: Statuses.Read
  },
  {
    method: "POST",
    path: "/v1/statuses",
    config: Statuses.Create
  },
  {
    method: "PUT",
    path: "/v1/statuses/{statusId}",
    config: Statuses.Update
  },
  {
    method: "DELETE",
    path: "/v1/statuses/{statusId}",
    config: Statuses.Delete
  },
];