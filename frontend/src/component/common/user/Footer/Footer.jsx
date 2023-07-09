import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Footer.css";

function Footer(props) {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <Container>
            <Row>
              <Col md={3}>
                <h4>CGV Việt Nam</h4>
                <ul className="ul-dis">
                  <li>
                    <a href="#">Giới thiệu</a>
                  </li>
                  <li>
                    <a href="#">Tiện ích online</a>
                  </li>
                  <li>
                    <a href="#">Thẻ quà tặng</a>
                  </li>
                  <li>
                    <a href="#">Tuyển dụng</a>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <h4>Diều khoản sử dụng</h4>
                <ul className="ul-dis">
                  <li>
                    <a href="#">Điều khoản chung</a>
                  </li>
                  <li>
                    <a href="#">Điều khoản giao dịch</a>
                  </li>
                  <li>
                    <a href="#">Chính sách thanh toán</a>
                  </li>
                  <li>
                    <a href="#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Câu hỏi thường gặp</a>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <h4>Kết nối với chúng tôi</h4>
                <ul className="ul-dis">
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <h4>Chăm sóc khách hàng</h4>
                <ul className="ul-dis">
                  <li>123 Đường ABC, Quận XYZ</li>
                  <li>Thành phố ABC</li>
                  <li>Việt Nam</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-bottom">
          <Container>
            <Row>
              <Col md={6}>
                <p>© 2023 CGV. All rights reserved.</p>
              </Col>
              <Col md={6}>
                <div className="social-icons">
                  <a href="#">
                    <i className="fab fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
      <div className="imgFooter">
        <img
          src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-bottom-footer.jpg"
          className="imgfooter"
        />
      </div>
    </>
  );
}

export default Footer;
