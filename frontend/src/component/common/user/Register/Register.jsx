import React, { useEffect, useState } from "react";
import NavbarHeader from "../navbar/NavbarHeader";
import Footer from "../Footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import validator from "validator";
import { formatDate1 } from "../formatdatas/FormatData";
import "./Register.css";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    Username: "",
    Phone: "",
    Email: "",
    Passwords: "",
    DateOfBirth: "",
    Gender: "",
    Area: "",
    Cinemafavourite: "",
  });

  const [emailRegister, setEmailRegister] = useState([]);
  const [phoneRegister, setPhoneRegister] = useState([]);

  const Loadusers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      const userss = response.data.data;
      const findEmail = userss.map((e) => e.Email);
      const findPhone = userss.map((e) => e.Phone);
      setEmailRegister(findEmail);
      setPhoneRegister(findPhone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Loadusers();
  }, []);

  const {
    Username,
    Phone,
    Email,
    Passwords,
    DateOfBirth,
    Gender,
    Area,
    Cinemafavourite,
  } = users;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Username === "" ||
      Phone === "" ||
      Email === "" ||
      Passwords === "" ||
      DateOfBirth === "" ||
      Gender === "" ||
      Area === "" ||
      Cinemafavourite === ""
    ) {
      notification.error({
        message: "Thất bại",
        description: "Mời nhập đủ thông tin",
      });
      return;
    }

    if (emailRegister.includes(Email)) {
      notification.error({
        message: "Thất bại",
        description: "Email đã tồn tại",
      });
      return;
    }

    if (phoneRegister.includes(Phone)) {
      notification.error({
        message: "Thất bại",
        description: "Phone đã tồn tại",
      });
      return;
    }

    if (!validator.isEmail(Email)) {
      notification.error({
        message: "Thất bại",
        description: "Email sai định dạng",
      });
      return;
    }

    if (Passwords.length < 5) {
      notification.error({
        message: "Thất bại",
        description: "Mật khẩu tối thiểu 5 kí tự",
      });
      return;
    }

    const newUser = {
      UserName: Username,
      Phone: Phone,
      Email: Email,
      Passwords: Passwords,
      DateOfBirth: formatDate1(DateOfBirth),
      Gender: +Gender,
      Area: Area,
      Cinemafavourite: Cinemafavourite,
      Roles: 1,
      Status: 0,
    };

    try {
      console.log(newUser);
      await axios.post("http://localhost:5000/api/v1/users/register", newUser);
      notification.success({
        message: "Thành công",
        description: "Đăng ký thành công",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Thất bại",
        description: "Đăng ký thất bại",
      });
    }
  };

  return (
    <>
      <NavbarHeader></NavbarHeader>
      <div className="register">
        <div className="nav">
          <Navbar variant="dark" className="navbar">
            <Container>
              <Nav
                style={{ display: "flex", flexDirection: "column !impotant" }}
                className="me-auto"
              >
                <div style={{ display: "flex" }}>
                  <Nav.Link>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span> Đăng nhập</span>
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="#">Đăng ký</Nav.Link>
                </div>
              </Nav>
            </Container>
          </Navbar>
          <div className="formregister">
            <form onSubmit={handleSubmit}>
              <label>Tên</label> <br />
              <input
                type="text"
                className="input"
                name="Username"
                value={Username}
                onChange={(e) => handleChange(e)}
              />
              <br />
              <label>Số điện thoại</label> <br />
              <input
                type="text"
                className="input"
                name="Phone"
                value={Phone}
                onChange={(e) => handleChange(e)}
              />
              <br />
              <label>Email</label> <br />
              <input
                type="text"
                className="input"
                name="Email"
                value={Email}
                onChange={(e) => handleChange(e)}
              />
              <br />
              <label>Mật khẩu</label> <br />
              <input
                type="password"
                className="input"
                name="Passwords"
                value={Passwords}
                onChange={(e) => handleChange(e)}
              />
              <br />
              <label>Ngày sinh</label> <br />
              <input
                type="date"
                name="DateOfBirth"
                value={DateOfBirth}
                onChange={(e) => handleChange(e)}
              />
              <label>Nam</label>
              <input
                type="radio"
                name="Gender"
                value="1"
                onChange={(e) => handleChange(e)}
                className="radio"
              />
              <label>Nữ</label>
              <input
                type="radio"
                name="Gender"
                value="0"
                onChange={(e) => handleChange(e)}
                className="radio"
              />
              <br />
              <label>Khu vực</label> <br />
              <select
                name="Area"
                value={Area}
                id=""
                onChange={(e) => handleChange(e)}
              >
                <option value="Khu vực">Khu vực</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              </select>
              <br />
              <label>Rạp yêu thích</label> <br />
              <select
                name="Cinemafavourite"
                value={Cinemafavourite}
                id=""
                onChange={(e) => handleChange(e)}
              >
                <option value="">Rạp yêu thích</option>
                <option value="CGV Aeon Long Biên">CGV Aeon Long Biên</option>
                <option value="CGV Aeon Hà Đông">CGV Aeon Hà Đông</option>
                <option value="CGV Vincom Ocean Park">
                  CGV Vincom Ocean Park
                </option>
                <option value="CGV Long Biên">CGV Long Biên</option>
                <option value="CGV Vincom Trần Duy Hưng">
                  CGV Vincom Trần Duy Hưng
                </option>
                <option value="CGV Hùng Vương Plaza">
                  CGV Hùng Vương Plaza
                </option>
                <option value="CGV Pandora City">CGV Pandora City</option>
                <option value="CGV Aeon Tân Phú">CGV Aeon Tân Phú</option>
                <option value="CGV Vincom Thủ Đức">CGV Vincom Thủ Đức</option>
                <option value="CGV Aeon Bình Tân">CGV Aeon Bình Tân</option>
              </select>
              <br />
              <button className="rigister" type="submit">
                Đăng kí
              </button>
            </form>
          </div>
        </div>
        <div className="carousell">
          <Carousel slide={false}>
            <Carousel.Item>
              <img
                className="d-block imgcarousel"
                src="https://www.cgv.vn/media/wysiwyg/2020/1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block imgcarousel"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOlfPozSv5qw36xc539CWz8W5koq9gBJsmz6AGgEGyYlSdFPB"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block imgcarousel"
                src="https://www.cgv.vn/media/wysiwyg/2020/2.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Register;
