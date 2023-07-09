const express = require("express");
const router = express.Router();
const connection = require("../utils/connection");
const db = require("../utils/db");

router.get("/", (req, res) => {
  console.log("kkkkkk");
  const { cinemaId, movieId, showTime } = req.body;
  console.log(req.query);
  console.log(req.body);
  db.execute(
    "SELECT chair FROM room WHERE CinemaId_room = ? AND showTime_room = ? AND MovieId_room = ?",
    [cinemaId, showTime, movieId]
  )
    .then((data) => {
      console.log(data[0]);
      res.status(200).json({
        message: "Lấy được rồihihi",
        data: data[0][0],
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
