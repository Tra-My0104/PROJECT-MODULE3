import React, { useEffect, useState } from "react";
import NavbarHeader from "../navbar/NavbarHeader";
import Footer from "../Footer/Footer";
import "./Bookticket.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

function Bookticket() {
  const daysInMonth = 31;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [showtimes, setShowtimes] = useState([]);
  const [daySelected, setDaySelected] = useState(null);
  let [city, setCity] = useState(0);
  const [dataCity, setDataCity] = useState([]);
  const [subMovie, setSubMovie] = useState("");
  const navigate = useNavigate();
  const [cityId, setCityId] = useState(() => {
    return dataCity[0]?.CinemaId;
  });
  const [showTimeLocation, setShowtimeLocation] = useState([]);
  const [time, setTime] = useState([]);
  const { id } = useParams();
  const idUser = JSON.parse(localStorage.getItem("user"));

  // API lấy thông tin movie theo id
  const getMovieById = () => {
    axios
      .get(`http://localhost:5000/api/v1/movie/detail/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieById();
  }, []);

  // lấy thông tin để render ra thông tin trang bookticket
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/book");
    setShowtimes(response.data.data);
  };

  // lấy thành phố để render rạp theo thành phố
  const loadCinema = async () => {
    const result = await axios.get(
      `http://localhost:5000/api/v1/movie/city?city=${city}`
    );
    setDataCity(result.data.resResult);
  };

  // lấy suất chiếu để render theo rạp phim
  const handleCinema = async () => {
    const resultShowtime = await axios.get(
      `http://localhost:5000/api/v1/movie/showtime/${cityId}`
    );
    setShowtimeLocation(resultShowtime.data.data);
  };

  const bookTicket = async () => {
    if (!daySelected || !city || !cityId || !showTimeLocation) {
      notification.error({
        message: "Thất bại",
        description: "Bạn chưa chọn đủ thông tin để đặt vé",
      });
      return;
    }
    if (!idUser || !idUser.UserId) {
      // Người dùng chưa đăng nhập, hiển thị thông báo hoặc thực hiện các hành động khác
      notification.error({
        message: "Thất bại",
        description: "Bạn chưa đăng nhập để đặt vé",
      });
      return;
    }
    try {
      const ticketData = {
        BookingDate: daySelected, // Ngày đặt vé
        City: city, // Thành phố
        Cinema: cityId, // Rạp
        UserId: idUser.UserId, // UserId từ local storage
        MovieId: id, // MovieId từ URL
        Showtime:
          showTimeLocation.length > 0 ? showTimeLocation[0].ShowtimeHour : null, // Xuất chiếu
      };
      const response = await axios.post(
        "http://localhost:5000/api/v1/book/ticket",
        ticketData
      );

      // Xử lý kết quả trả về từ máy chủ
      if (response.status === 200) {
        // Nếu thành công, hiển thị thông báo và thực hiện các hành động khác
        localStorage.setItem(
          "ticketId",
          JSON.stringify(response.data.ticketId)
        );
        localStorage.setItem("showTime", JSON.stringify(ticketData.Showtime));
        localStorage.setItem("movieId", JSON.stringify(ticketData.MovieId));
        localStorage.setItem("cinema", JSON.stringify(ticketData.Cinema));
        // notification.success({
        //   message: "Đặt vé thành công",
        // });
        navigate("/bookchair");
      } else {
        // Nếu không thành công, xử lý lỗi hoặc hiển thị thông báo lỗi
        console.log("Thêm vé không thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleCinema();
  }, [cityId]);

  useEffect(() => {
    loadCinema(city);
  }, [city]);

  return (
    <>
      <NavbarHeader></NavbarHeader>
      <div className="bookTicket">
        <div className="calendar">
          <div className="month">
            <h1 style={{ textAlign: "center" }}>Tháng 6</h1>
          </div>
          <div className="dates">
            {daysArray.map((day) => {
              const date = new Date(2023, 5, day);
              const dayOfWeek = date.toLocaleString("default", {
                weekday: "long",
              });

              return (
                <button
                  className={`day ${daySelected === day && "active"}`}
                  key={day}
                  onClick={() => setDaySelected(day)}
                  name="Day"
                  value={day}
                >
                  <time>{day} - </time>
                  <span>{dayOfWeek}</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="hr" />
        <div className="city">
          <div className="div">
            <button
              className={`hn ${city === 1 && "active"}`}
              onClick={() => setCity(1)}
            >
              Hà Nội
            </button>
          </div>
          <div className="div">
            <button
              className={`hn ${city === 2 && "active"}`}
              onClick={() => setCity(2)}
            >
              Hồ Chí Minh
            </button>
          </div>
        </div>
        <hr className="hr" />
        <div className="sub">
          <button
            className={`sub1 ${subMovie === 1 && "active"}`}
            onClick={() => setSubMovie(1)}
          >
            2D Phụ Đề Việt
          </button>
          <button
            className={`sub2 ${subMovie === "2D Lồng Tiếng Việt" && "active"}`}
            onClick={() => setSubMovie("2D Lồng Tiếng Việt")}
          >
            2D Lồng Tiếng Việt
          </button>
        </div>
        <hr className="hr" />
        <div className="cgv">
          <select
            style={{ width: 200 }}
            className="form-control "
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >
            <option value="">--- Chọn rạp---</option>
            {dataCity.length > 0 ? (
              dataCity.map((e) => (
                <option value={e.CinemaId}>{e.Cinemaname}</option>
              ))
            ) : (
              <option value="">Chọn rạp</option>
            )}
          </select>
        </div>
        <hr className="hr" />
        <div className="showtime">
          <h3>Chọn xuất chiếu</h3>
          {showTimeLocation ? (
            showTimeLocation.map((e, index) => (
              <button
                key={index}
                className={`showTime ${time === index && "active"}`}
                onClick={() => setTime(index)}
              >
                {e.ShowtimeHour}
              </button>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <hr className="hr" />
        <button onClick={bookTicket} className="bookticket">
          Đặt vé
        </button>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Bookticket;
