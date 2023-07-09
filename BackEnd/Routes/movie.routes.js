const express = require("express");
const router = express.Router();
const connection = require("../utils/connection");
const db = require("../utils/db");
const { v4: uuidv4 } = require("uuid");
// Lấy thông tin tất cả movie
router.get("/", (req, res) => {
  const query = "SELECT * FROM movie";
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Lỗi khi lấy",
        err: err,
      });
    } else {
      res.status(200).json({
        message: "Lấy thành công",
        data: result,
      });
    }
  });
});

// Lấy chi tiết thông tin một movie
router.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  const query = "SELECT * FROM movie WHERE MovieId = ?";
  connection.query(query, id, (err, result) => {
    if (err) {
      res.json({
        status: 404,
        message: "Khong lay duoc",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "thanh cong",
        data: result,
      });
    }
  });
});

// Thêm mới movie
router.post("/", async (req, res) => {
  const idMovie = uuidv4();
  const {
    imgMovie,
    movieGenre,
    timeMovie,
    Premiere,
    movieTrailer,
    Director,
    Language,
    Actor,
    movieName,
    showtimeId,
    cityName,
    cinemaId_movie,
  } = req.body;
  try {
    await db.execute(
      "INSERT INTO `project_module`.`movie` (`MovieId`, `ImgMovie`, `MovieGenre`, `TimeMovie`, `Premiere`, `MovieTrailer`, `Director`, `Language`, `Actor`, `MovieName`, `ShowtimeId`, `CityId`, `CinemaId_movie`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        idMovie,
        imgMovie,
        movieGenre,
        timeMovie,
        Premiere,
        movieTrailer,
        Director,
        Language,
        Actor,
        movieName,
        showtimeId,
        cityName,
        cinemaId_movie,
      ]
    );
    res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/city", async (req, res) => {
  const { city } = req.query;
  try {
    const resultFind = await db.execute(
      `SELECT * FROM project_module.cinema WHERE cityId_cinema=${city}`
    );
    const resResult = resultFind[0];
    res.status(200).json({ resResult });
  } catch (error) {
    console.log(error);
  }
});

router.get("/showtime/:cinemaId", async (req, res) => {
  const { cinemaId } = req.params;
  const query = "SELECT * FROM showtime WHERE CinemaId = ?";
  connection.query(query, cinemaId, (err, result) => {
    if (err) {
      res.json({
        status: 404,
        message: "Khong lay duoc",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "thanh cong",
        data: result,
      });
    }
  });
});

module.exports = router;
