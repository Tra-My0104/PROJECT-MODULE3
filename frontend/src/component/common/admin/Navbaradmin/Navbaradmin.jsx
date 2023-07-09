import React from "react";
import "./Navbaradmin.css";

function Navbaradmin() {
  return (
    <div>
      <nav>
        <div className="menu">
          <div className="container">
            <ul className="inner-menu">
              <li>
                <a href="#" className="a">Admin</a>
                <ul className="dropdown">
                  <li>
                    <a href="#" className="a">Admin User</a>
                  </li>
                  <li>
                    <a href="#" className="a">Admin Movie</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/" className="a">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbaradmin;
