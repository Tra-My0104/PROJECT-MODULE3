import React, { useEffect, useState } from "react";
import "./Home.css";
import Footer from "../Footer/Footer";
import NavbarHeader from "../navbar/NavbarHeader";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home(props) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);

  // lấy dữ liệu từ database về để render ra giao diện
  const loadMovie = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/movie");
    console.log(response.data.data);
    setMovie(response.data.data);
  };
  // console.log(movie);

  useEffect(() => {
    loadMovie();
  }, []);

  const handleDetail = async (id) => {
    console.log(id);
    navigate(`/detailmovie/${id}`);
  };

  const handlePlayTrailer = async (id) => {
    navigate(`/detailmovie/trailer/${id}`);
  };

  return (
    <>
      <NavbarHeader></NavbarHeader>
      <div className="imgIcon">
        <img src="./Image/common_sprite_area.png" alt="" className="imgicon" />
        <hr />
        <hr />
      </div>
      <div className="containerBgCr">
        <div
          id="carouselExampleInterval"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
              <img
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/o/doraemon_2023_rolling.png"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <img
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980wx448h_34.jpg"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_88.png"
                class="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="containerMovie">
        <img
          src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/h3_movie_selection.gif"
          alt=""
        />
        <div className="slider-container">
          <Slider {...settings}>
            {movie.map((e) => (
              <div className="img-wapper">
                <div className="img-item">
                  <img width={500} src={e.ImgMovie} className="imgMovie" />
                  <div className="btn-play">
                    <button
                      className="play"
                      onClick={() => handlePlayTrailer(e.MovieId)}
                    >
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                  <div className="btn-img">
                    <p className="tilte">{e.MovieName}</p>
                    <button
                      className="detail"
                      onClick={() => handleDetail(e.MovieId)}
                    >
                      Xem chi tiết
                    </button>
                    <Link to={`/bookticket/${e.MovieId}`}>
                      <button className="booking">
                        <i class="fa-solid fa-phone-volume"></i>Đặt vé
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="containerEvent">
        <img
          src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_event.gif"
          alt=""
        />
        <div>
          <img src="./Image/Untitled.png" alt="" className="eventCGV" />
        </div>
        <div className="event">
          <img
            src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_u22_n_o_240x201.png"
            className="imgEvent"
          />
          <img
            src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/b/i/birthday_popcorn_box_240x201.png"
            className="imgEvent"
          />
          <img
            src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed-02.png"
            className="imgEvent"
          />
          <img
            src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_culture_day_n_o_240x201.png"
            className="imgEvent"
          />
        </div>
        <div className="event2">
          <img
            src="https://www.cgv.vn/media/wysiwyg/packages/214x245.jpg"
            className="imgEvent2"
          />
          <img
            src="https://www.cgv.vn/media/wysiwyg/2023/042023/U22_N_O_Apr_496x267.png"
            className="imgEvent2"
          />
          <img
            src="https://www.cgv.vn/media/wysiwyg/2021/CGV-DIGITAL-HALL-RENTAL-214x245.png"
            className="imgEvent2"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
