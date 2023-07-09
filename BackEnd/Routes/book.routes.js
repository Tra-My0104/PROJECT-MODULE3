const express = require("express");
const router = express.Router();
const connection = require("../utils/connection");
const db = require("../utils/db");
router.get("/", (req, res) => {
  console.log("aaa");
  const query =
    "SELECT m.Language, s.ShowtimeHour, c.Cinemaname FROM movie m join showtime s on s.ShowtimeId = m.ShowtimeId join cinema c on c.cinemaId = s.CinemaId ";
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

router.post("/ticket", (req, res) => {
  const { BookingDate, City, Cinema, UserId, MovieId, Showtime } = req.body;
  const ticketId = Math.floor(Math.random() * 100000);
  try {
    db.execute(
      "INSERT INTO `project_module`.`ticket` (TicketId ,`BookingDate`,`City`,`Cinema`,`UserId`,`MovieId`,`Showtime`) VALUES (?,?,?,?,?,?,?)",
      [ticketId, BookingDate, City, Cinema, UserId, MovieId, Showtime]
    );
    res.status(200).json({
      message: "Thêm thành công rồi",
      ticketId,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Lỗi rồi",
      err: error,
    });
  }
});

router.get("/ticket/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.execute("SELECT * FROM ticket WHERE TicketId = ?", [
      id,
    ]);
    const [ticket] = data;
    res.status(200).json({
      message: "Lấy thành công rồi",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi rồi không lấy được",
      error: error,
    });
  }
});

router.put("/ticket/:id", async (req, res) => {
  const { id } = req.params;
  const { seatBook, totalPay } = req.body;
  try {
    const update = await db.execute(
      "UPDATE ticket SET Seat = ? , price = ? WHERE TicketId = ?",
      [seatBook.toString(), totalPay, id]
    );
    const dataTicket = await db.execute(
      `SELECT * FROM ticket WHERE TicketId=${id}`
    );

    const dataMovie = await db.execute(
      `SELECT ImgMovie,MovieName FROM movie WHERE MovieId="${dataTicket[0][0].MovieId}"`
    );
    console.log("dataTicket0", dataMovie[0]);

    const dataCinema = await db.execute(
      `SELECT Cinemaname FROM cinema Where CinemaId=${dataTicket[0][0].Cinema} `
    );
    console.log("datacinnema", dataCinema[0]);

    if (update[0].affectedRows > 0) {
      return res.status(201).json({
        message: "Update thành công",
        data: { ...dataTicket[0][0], ...dataMovie[0][0], ...dataCinema[0][0] },
      });
    } else {
      return res.status(404).json({
        message: "Id không tồn tại",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.get("/room", (req, res) => {
  const { cinemaId, movieId, showTime } = req.query;
  console.log(req.query);
  db.execute(
    "SELECT chair FROM room WHERE CinemaId_room = ? AND showTime_room = ? AND MovieId_room = ?",
    [cinemaId, showTime, movieId]
  )
    .then((data) => {
      res.status(200).json({
        message: "Lấy được rồihihi",
        data: data[0][0],
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
