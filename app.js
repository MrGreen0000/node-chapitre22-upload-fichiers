const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname + "/upload") });

const util = require("util");
require("./database");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/file", upload.array("avatar", 2), (req, res) => {
  console.log(
    util.inspect(req.body, {
      compact: false,
      depth: 5,
      breakLength: 80,
      color: true,
    })
  );
  console.log(
    util.inspect(req.files, {
      compact: false,
      depth: 5,
      breakLength: 80,
      color: true,
    })
  );
  res.end();
});

app.use((err, req, res, next) => {
  console.log(
    util.inspect(err, {
      compact: false,
      depth: 5,
      breakLength: 80,
      color: true,
    })
  );
  req.status(500).redirect("/");
});

app.listen(3000);
