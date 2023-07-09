import React, { useEffect, useState } from "react";
import NavbarHeader from "../navbar/NavbarHeader";
import Footer from "../Footer/Footer";
import "./DetailMovie.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {formatDate} from "../formatdatas/FormatData"

function DetailMovie(props) {
  const [movieDetail , setMovieDetail] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();
  // console.log(id);

  const loadMovieDetail = async() => {
    const reponse = await axios.get(`http://localhost:5000/api/v1/movie/detail/${id}`);
    console.log(reponse.data.data);
    setMovieDetail(reponse.data.data[0])
  }
  console.log(movieDetail);
  

  useEffect (() => {
    loadMovieDetail()
  }, []);

  const handleTrailer = async(id) => {
    // console.log(id);
    navigate(`/detailmovie/trailer/${id}`)
  }

  return (
    <>
      <NavbarHeader></NavbarHeader>
      <div className="containerDetail">
        <h1 className="contentMovie">Nội dung phim</h1>
        <hr className="hr" />
        <div className="movieDetail">
          <div>
            <img
              src={movieDetail.ImgMovie}
              width={300}
              height={500}
              className="imgDetail"
            />
          </div>
          <div className="profileMovie">
            <h2>{movieDetail.MovieName}</h2>
            <hr className="hr1" />
            <p>Đạo diễn :{movieDetail.Director}</p>
            <p>Diễn viên :{movieDetail.Actor}</p>
            <p>Thể loại :{movieDetail.MovieGenre}</p>
            <p>Khởi chiếu :{formatDate(movieDetail.Premiere)}</p>
            <p>Thời lượng :{movieDetail.TimeMovie}</p>
            <p>Ngôn ngữ :{movieDetail.Language}</p>
            <div className="buttonn">
                <button className="btn-trailer" onClick={() => handleTrailer(movieDetail.MovieId)}>Trailer</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default DetailMovie;
