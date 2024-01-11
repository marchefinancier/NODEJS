require("dotenv").config();
const express = require('express');

var cors = require("cors");
const courses = require("./routes/apis/youtubecourses");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = 3000;

app.use(express.json());

app.use("/api/pluscours", courses)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
