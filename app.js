const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({
  dest: path.join(__dirname + "/upload"),
  limits: {
    fileSize: 10000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/jpeg") {
      return cb(new Error("Seuls les images en JPG sont autorisées"));
    } else {
      cb(null, true);
    }
  },
});

const util = require("util");
require("./database");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

// app.post("/file", upload.single("avatar"), (req, res) => {
//   console.log(
//     util.inspect(req.body, {
//       compact: false,
//       depth: 5,
//       breakLength: 80,
//       color: true,
//     })
//   );
//   console.log(
//     util.inspect(req.files, {
//       compact: false,
//       depth: 5,
//       breakLength: 80,
//       color: true,
//     })
//   );
//   res.end();
// });

app.post("/file", (req, res) => {
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      // En cas d'erreur, renvoyer le message d'erreur à la page de formulaire
      return res.status(400).render("index", { error: err.message });
    }
    res.end();
  });
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
  res.status(500).redirect("/");
});

app.listen(3000);
