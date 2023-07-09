import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/common/user/Home/Home";
import Register from "./component/common/user/Register/Register";
import Login from "./component/common/user/Login/Login";
import Navbaradmin from "./component/common/admin/Navbaradmin/Navbaradmin";
import Adminuser from "./component/common/admin/Tableadmin/Adminuser";
import DetailMovie from "./component/common/user/DetailMovie/DetailMovie";
import Trailer from "./component/common/user/Trailer/Trailer";
import Bookticket from "./component/common/user/Bookticket/Bookticket";
import AdminMovie from "./component/common/admin/Tableadmin/AdminMovie";
import Bookchair from "./component/common/user/Bookchair/Bookchair";
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/navbaradmin" element={<Navbaradmin />}></Route>
        <Route path="/adminuser" element={<Adminuser />}></Route>
        <Route path="/detailmovie/:id" element={<DetailMovie />}></Route>
        <Route path="/detailmovie/trailer/:id" element={<Trailer />}></Route>
        <Route path="/bookticket/:id" element={<Bookticket />}></Route>
        <Route path="/adminmovie" element={<AdminMovie />}></Route>
        <Route path="/bookchair" element={<Bookchair/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
