import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  let flagUser = JSON.parse(localStorage.getItem("user"));


  const hanldeLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin đăng nhập của người dùng khỏi local storage
    window.location.href = "/"; // Chuyển hướng về trang chủ
  };

  return (
    <div className="navContainer">
      <div className="linkNav">
        <a href="">
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/recruitment_icon1.png"
            alt=""
          />
          TUYỂN DỤNG
        </a>
        <a href="">
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_promotion25.png"
            alt=""
          />
          TIN MỚI VÀ ƯU ĐÃI
        </a>
        <a href="">
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_ticket25.png"
            alt=""
          />
          VÉ CỦA TÔI
        </a>
        {flagUser ? (
          <a href="/" onClick={hanldeLogout}>
            <img
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_login25.png"
              alt=""
            />
            Thoát
            <span className="span">Xin chào: {flagUser.UserName}</span>
          </a>
        ) : (
          <a href="/login">
            <img
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_login25.png"
              alt=""
            />
            ĐĂNG NHẬP/
            <span className="span">
              <a href="/register">ĐĂNG KÝ</a>
            </span>
          </a>
        )}
        <div className="from-language">
          <ul className="ull">
            <li className="viet">VI</li>
            <li className="eng">EN</li>
          </ul>
        </div>
      </div>
      <div className="bgNav">
        <div className="containerNav">
          <Link to="/">
            <img
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
              alt=""
              className="logoNav"
            />
          </Link>
          <div class="dropdown">
            <button class="dropbtn">PHIM</button>
            <div class="dropdown-content">
              <a href="#">PHIM ĐANG CHIẾU</a>
              <a href="#">PHIM SẮP CHIẾU</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">RẠP CGV</button>
            <div class="dropdown-content">
              <a href="#">TẤT CẢ CÁC RẠP</a>
              <a href="#">RẠP ĐẶC BIỆT</a>
              <a href="#">RẠP 3D</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">THÀNH VIÊN</button>
            <div class="dropdown-content">
              <a href="#">Tài Khoản CGV</a>
              <a href="#">Quyền Lợi</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">CULTUREPLEX</button>
            <div class="dropdown-content">
              <a href="#">Quầy Online</a>
              <a href="#">Thuê Rạp & Vé Nhóm</a>
              <a href="#">e-CGV</a>
              <a href="#">Thẻ Quà Tặng</a>
              <a href="#">CGV Rules</a>
            </div>
          </div>
          <button className="btnnav">
            TUYỂN DỤNG
            <img
              src="https://www.cgv.vn/skin//frontend/cgv/default/images/hot-jobs.png"
              alt=""
            />
          </button>
          <div className="logoTicket">
            <img
              src="https://www.cgv.vn/media/wysiwyg/2019/AUG/kenhcine.gif"
              alt=""
              className="logoKenh"
            />
            <img
              src="https://www.cgv.vn/media/wysiwyg/news-offers/mua-ve_ngay.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
