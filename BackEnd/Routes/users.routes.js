const express = require("express");
const router = express.Router();
const connection = require("../utils/connection");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const checkValidate = require("../Middleware/checkValidate");
require("dotenv").config();

router.get("/", (req, res) => {
  const query = "SELECT * FROM users";
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

// đăng ký
router.post(
  "/register",
  checkValidate.checkValidate,
  checkValidate.checkDuplicate,
  (req, res) => {
    // console.log("run into line 34");
    console.log(req.body);
    const {
      UserName,
      Phone,
      Email,
      Passwords,
      DateOfBirth,
      Gender,
      Area,
      Cinemafavourite,
      Roles,
    } = req.body;

    // Tạo một chuỗi UUID để làm giá trị cho trường UserId
    const UserId = uuidv4();

    // Mã hóa mật khẩu
    bcrypt.hash(Passwords, 10, (err, hash) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: err,
        });
      } else {
        const newUser = [
          UserId,
          UserName,
          Phone,
          Email,
          hash,
          DateOfBirth,
          Gender,
          Area,
          Cinemafavourite,
          Roles,
        ];
        console.log(DateOfBirth);
        // Tạo câu truy vấn INSERT INTO, đảm bảo rằng kiểu dữ liệu cho các trường là chính xác
        const query =
          "INSERT INTO users(UserId, UserName, Phone, Email, Passwords, DateOfBirth, Gender, Area, Cinemafavourite,Roles,Status) VALUES (?,?,?,?,?,?,?,?,?,?,0)";
        // kết nối
        connection.query(query, newUser, (err) => {
          if (err) {
            res.status(500).json({
              status: 500,
              message: err,
            });
          } else {
            return res.status(200).json({
              status: 200,
              message: "Thêm mới thành công",
            });
          }
        });
      }
    });
  }
);

// dang nhap
router.post("/login", (req, res) => {
  const { Email, Passwords } = req.body;
  const query = "SELECT * FROM users WHERE Email = ?";
  connection.query(query, [Email], (err, result) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err,
      });
    } else {
      if (result.length === 0) {
        res.status(404).json({
          message: "Email hoặc mật khẩu không tồn tại",
        });
      } else {
        // nếu như có tồn tại email
        const user = result[0];
        // so sánh mật khẩu đã nhập với mật khẩu trong csdl
        bcrypt.compare(Passwords, user.Passwords, (err, isMatch) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              message: err,
            });
          } else {
            if (!isMatch) {
              res.status(400).json({
                message: "Email hoặc mật khẩu không đúng",
              });
            } else {
              // tạo ra một chuỗi token
              const token = jwt.sign({ id: user.UserId }, process.env.SECRET, {
                expiresIn: "1h",
              });
              console.log(token);
              res.status(200).json({
                status: 200,
                message: "Đăng nhập thành công",
                data: user,
                token,
              });
            }
          }
        });
      }
    }
  });
});

router.delete("/:id", checkValidate.isAuth, (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM `project_module`.`users` WHERE UserId = ?";
  connection.query(query, id, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Lỗi không xóa được",
        err: err,
      });
    } else {
      res.status(200).json({
        message: "Xóa thành công",
        data: result,
      });
    }
  });
});

router.put("/:id", checkValidate.isAuth, (req, res) => {
  const { id } = req.params;
  const { Roles, Status } = req.body;
  const values = [Roles, Status, id];
  const query =
    "UPDATE `project_module`.`users` SET `Roles` = '?' , `Status` = '?' WHERE (`UserId` = ?)";

  connection.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Lỗi khi update",
        err: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Cập nhật user thành công",
        data: result,
      });
    }
  });
});

module.exports = router;
