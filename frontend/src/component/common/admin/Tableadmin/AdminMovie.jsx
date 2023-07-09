import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbaradmin from "../Navbaradmin/Navbaradmin";
import Footer from "../../user/Footer/Footer";
import "./AdminMovie.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function AdminMovie(props) {
  const [inforMovie, setInforMovie] = useState({
    imgMovie: "",
    movieGenre: "",
    timeMovie: "",
    Premiere: "",
    movieTrailer: "",
    Director: "",
    Language: "",
    Actor: "",
    movieName: "",
    showtimeId: "",
    cityName: "",
    cinemaId_movie: "",
  });
  const [movie,setMovie] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setInforMovie({ ...inforMovie, [e.target.name]: e.target.value });
  };
  //   console.log(inforMovie);

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/movie", inforMovie);
      setInforMovie("");
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMovie = async() =>{
    const result = await axios.get("http://localhost:5000/api/v1/movie");
    // console.log(result.data.data);
    setMovie(result.data.data);
  }

  useEffect(() => {
    loadMovie();
  }, [])

  return (
    <>
      <Navbaradmin></Navbaradmin>
      <Button variant="primary" onClick={handleShow} className="buttonAdd">
        Thêm movie
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="containerInfor">
            <input
              type="text"
              placeholder="anh"
              name="imgMovie"
              value={inforMovie.imgMovie}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Thể loại"
              name="movieGenre"
              value={inforMovie.movieGenre}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="thời gian chiếu"
              name="timeMovie"
              value={inforMovie.timeMovie}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="công chiếu"
              name="Premiere"
              value={inforMovie.Premiere}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="trailer"
              name="movieTrailer"
              value={inforMovie.movieTrailer}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Đạo diễn"
              name="Director"
              value={inforMovie.Director}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Ngôn ngữ"
              name="Language"
              value={inforMovie.Language}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Diễn viên"
              name="Actor"
              value={inforMovie.Actor}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="tên phim"
              name="movieName"
              value={inforMovie.movieName}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="thành phố"
              name="cityName"
              value={inforMovie.cityName}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Xuất chiếu"
              name="showtimeId"
              value={inforMovie.showtimeId}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Rạp chiếu"
              name="cinemaId_movie"
              value={inforMovie.cinemaId_movie}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover variant="dark" className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DateOfBirth</th>
            <th>Gender</th>
            <th>Area</th>
            <th>Cinemafavourite</th>
            <th>Roles</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </Table>
      <Footer></Footer>
    </>
  );
}

export default AdminMovie;
