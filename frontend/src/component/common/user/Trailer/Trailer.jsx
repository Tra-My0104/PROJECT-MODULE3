import React, { useEffect, useState } from "react";
import NavbarHeader from "../navbar/NavbarHeader";
import "./Trailer.css";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";

function Trailer(props) {
  const [trailer, setTrailer] = useState("");
  const { id } = useParams();

  const loadTrailer = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/movie/detail/${id}`
    );
    // console.log(response.data.data[0].MovieTrailer);
    setTrailer(response.data?.data[0].MovieTrailer);
  };
  console.log(trailer);
  useEffect(() => {
    loadTrailer();
  }, []);

  return (
    <div>
      <NavbarHeader></NavbarHeader>
      <iframe
        src={trailer}
        frameborder="0"
        width={700}
        height={500}
        allow="accelerometer; autoplay; "
        className="trailer"
      ></iframe>
      <Footer></Footer>
    </div>
  );
}

export default Trailer;
