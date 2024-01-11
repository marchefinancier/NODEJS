const express = require("express");
const { coursefetching } = require("../../controllers/courses");

const courses = express.Router();

courses.post("/:course",coursefetching)

module.exports = courses;