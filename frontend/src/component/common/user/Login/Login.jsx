import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavbarHeader from "../navbar/NavbarHeader";
import Carousel from "react-bootstrap/Carousel";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      notification.error({
        message: "Thất bại",
        description: "Mời nhập đủ thông tin",
      });
      return;
    }

    await axios
      .post("http://localhost:5000/api/v1/users/login", {
        Email: email,
        Passwords: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.data.Status === 1) {
          notification.error({
            message: "Đăng nhập thất bại",
            description: "Tài khoản của bạn đã bị chặn",
          });
          return;
        } else if (response.data.data?.Status === 0) {
          if (response.data.data.Roles === 1) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            notification.success({
              message: "Thành công",
              description: "Đăng nhập thành công",
            });
            navigate("/");
            return;
          } else {
            localStorage.setItem("admin", JSON.stringify(response.data.data));
            notification.success({
              message: "Thành công",
              description: "Đăng nhập thành công, Xin chào Admin",
            });
            navigate("/adminuser");
            return;
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          notification.error({
            message: "Thất bại",
            description: "Email hoặc mật khẩu không tồn tại",
          });
          return;
        } else if (error.response.status === 400) {
          notification.error({
            message: "Thất bại",
            description: "Email hoặc mật khẩu không đúng",
          });
          return;
        } else {
          notification.error({
            message: "Thất bại",
            description: "Đăng nhập thất bại",
          });
          return;
        }
      });
  };

  return (
    <>
      <NavbarHeader></NavbarHeader>
      {/* <h1>Đăng nhập</h1> */}
      <div className="containerLogin">
        <div className="nav">
          <Navbar variant="dark" className="navbar">
            <Container>
              <Nav
                style={{ display: "flex", flexDirection: "column !impotant" }}
                className="me-auto"
              >
                <div style={{ display: "flex" }}>
                  <Nav.Link href="#">Đăng nhập</Nav.Link>
                  <Nav.Link>
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span> Đăng ký</span>
                    </Link>
                  </Nav.Link>
                </div>
              </Nav>
            </Container>
          </Navbar>
          <div className="formlogin">
            <form onSubmit={handleSubmit}>
              <label>Email hoặc số điện thoại</label> <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <br />
              <label>Mật khẩu</label> <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <br />
              <button className="login" type="submit">
                Đăng nhập
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
export default Login;
