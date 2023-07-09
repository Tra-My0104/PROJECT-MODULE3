import { useEffect, useState } from "react";
import "./Bookchair.css";
import NavbarHeader from "../navbar/NavbarHeader";
import Footer from "../Footer/Footer";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Bookchair() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const seats = Array.from({ length: 30 }, (_, index) => index + 1);
  const [seatBook, setSeatBook] = useState([]);
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [chair, setChair] = useState([]);

  const handleSeatBook = (index) => {
    const isSeat = seatBook.includes(index);

    if (isSeat) {
      setSeatBook(seatBook.filter((seatBook) => seatBook !== index));
    } else {
      setSeatBook([...seatBook, index]);
    }
  };
  let movieId = JSON.parse(localStorage.getItem("movieId"));
  let cinemaId = JSON.parse(localStorage.getItem("cinema"));
  let showTime = JSON.parse(localStorage.getItem("showTime"));

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/book/room?cinemaId=${cinemaId}&movieId=${movieId}&showTime=${showTime}`
      )
      .then((data) => setChair(data.data.data))
      .catch((err) => console.log(err));
  },[]);
  console.log("hihi", chair);
  let newArray=[]
  if (chair == []) {
     newArray = chair?.chair
      .split(",")
      .map((item) => item.replace(/^'|'$/g, ""));
  }

  let ticketId = JSON.parse(localStorage.getItem("ticketId"));
  let totalPay = 100000 * seatBook.length;
  const handlePay = () => {
    if (seatBook.length > 0) {
      const body = { seatBook, totalPay };
      axios
        .put(`http://localhost:5000/api/v1/book/ticket/${ticketId}`, body)
        .then((data) => {
          setBill(data.data.data);
          notification.success({
            message: "Thành công",
            description: "Thanh toán thành công",
          });
          setShow(true);
          return;
        })
        .catch((err) => console.log(err));
    } else {
      notification.error({
        message: "Thất bại",
        description: "Bạn chưa đặt ghế",
      });
    }
  };
  if (seatBook == []) {
    return <div>Loaddingggg</div>;
  }
  return (
    <>
      <NavbarHeader></NavbarHeader>
      <div>
        <h3 className="tilteBook">BOOKING ONLINE</h3>
        <div className="seats">
          {newArray?.map((seat, index) => (
            <div
              key={index}
              value={index}
              className={`seat ${seatBook.includes(index) ? "active" : ""} ${
                seat === 1 && "bought"
              }`}
              onClick={() => handleSeatBook(index)}
            >
              Ghế {index + 1}
            </div>
          ))}
          <p className="total">Tổng tiền : {totalPay} VNĐ----------</p>
          <p className="seatlength">Tổng số ghế : {seatBook.length}</p>
        </div>
        <div className="ticketBook">
          <div className="listIcon">
            <div className="icon checked">Đang chọn</div>
            <div className="icon occupied">Đã chọn</div>
            <div className="icon ban">Không chọn được</div>
          </div>
          <div className="listIcon">
            <div className="icon often">Thường</div>
            <div className="icon vip">VIP</div>
            <div className="icon couple">Ghế đôi</div>
          </div>
        </div>
      </div>
      <button onClick={handlePay}>Thanh toán</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tên phim : {bill.MovieName}</p>
          <img src={bill.ImgMovie} width={200} height={300} />
          <p>Số ghế : {bill.Seat}</p>
          <p>Tên rạp :{bill.Cinemaname}</p>
          <p>Ngày đặt :{bill.BookingDate}</p>
          <p>Mã số vé :{bill.TicketId}</p>
          <p>Tổng tiền :{bill.price}VNĐ</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer></Footer>
    </>
  );
}

export default Bookchair;
