const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const connection = require("../utils/connection");
const jwt = require("jsonwebtoken");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const checkTsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

async function checkValidate(req, res, next) {
  const {
    UserName,
    Phone,
    Email,
    Passwords,
    DateOfBirth,
    Gender,
    Area,
    Cinemafavourite,
  } = req.body;

  if (checkTsEmpty(UserName)) {
    return res.status(404).json({
      message: "Tên không được phép để trống",
    });
  }
  if (checkTsEmpty(Phone)) {
    return res.status(404).json({
      message: "Điện thoại không được phép để trống",
    });
  }
  if (checkTsEmpty(Passwords)) {
    return res.status(404).json({
      message: "Mật khẩu không được phép để trống",
    });
  }
  if (checkTsEmpty(Email)) {
    return res.status(404).json({
      message: "Email được không được phép để trống",
    });
  }
  if (checkTsEmpty(DateOfBirth)) {
    return res.status(404).json({
      message: "Ngày sinh không được phép để trống",
    });
  }
  if (checkTsEmpty(Gender)) {
    return res.status(404).json({
      message: "Giới tính không được phép để trống",
    });
  }
  if (checkTsEmpty(Area)) {
    return res.status(404).json({
      message: "Khu vực không được phép để trống",
    });
  }
  if (checkTsEmpty(Cinemafavourite)) {
    return res.status(404).json({
      message: "Rạp chiếu không được phép để trống",
    });
  }

  if (Passwords.length < 5) {
    return res.status(400).json({
      message: "Mật khẩu tối thiểu 5 kí tự",
    });
  }

  // Nếu các trường đã được cung cấp, tiếp tục xử lý yêu cầu
  next();
}

const checkDuplicate = (req, res, next) => {
  const { Email, Phone } = req.body;
  // Câu lệnh truy vấn lấy email trong database
  const query = "SELECT * FROM users WHERE Email=? OR Phone = ?";
  connection.query(query, [Email, Phone], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    } else {
      if (result.length > 0) {
        const duplicateEmail =
          result.find((user) => user.Email === Email) !== undefined;
        const duplicatePhone =
          result.find((user) => user.Phone === Phone) !== undefined;

        if (duplicateEmail) {
          return res.status(400).json({
            status: 400,
            message: "Email đã tồn tại trong hệ thống",
          });
        }

        if (duplicatePhone) {
          return res.status(400).json({
            status: 400,
            message: "Phone đã tồn tại trong hệ thống",
          });
        }
      } else {
        next();
      }
    }
  });
};

const isAuth = (req, res) => {
  try {
    let authorization = req.headers.authorization.split(" ");
    console.log("authen", authorization);
    if (authorization.includes("Bearer") && authorization.length > 1) {
      let token = authorization[1];
      let decoded = jwt.verify(token, process.env.SECRET);
      let { UserId } = decoded;
      const query = "SELECT * FROM users WHERE UserId = ?";
      connection.query(query, [UserId], (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          console.log(result);
          res.json({
            [UserId]: result,
          });
        }
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { checkValidate, checkDuplicate, isAuth };
