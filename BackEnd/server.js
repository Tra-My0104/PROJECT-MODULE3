const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./Routes/users.routes");
const movieRoute = require("./Routes/movie.routes");
const bookRoute = require("./Routes/book.routes");
const ticketRoute = require("./Routes/ticket.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// use routes
server.use("/api/v1/users", userRoute);
server.use("/api/v1/movie", movieRoute);
server.use("/api/v1/book", bookRoute);
server.use("/api/v1/ticket", ticketRoute);
server.listen(5000, () => {
  console.log("http://localhost:5000");
});
