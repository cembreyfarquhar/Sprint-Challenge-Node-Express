const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");
const projectDb = require("../data/helpers/projectModel.js");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());



module.exports = {
  server
};
