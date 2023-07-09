import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Navbaradmin from "../Navbaradmin/Navbaradmin";
import Footer from "../Footer/Footer";
import "./Adminuser.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { formatDate } from "../formatdatas/FormatData";
function Adminuser() {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const loadUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      console.log(response.data.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  console.log(user);

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:5000/api/v1/users/${id}`);
      loadUser();
    } catch (error) {
      console.log(error);
    }
  };

  const [editUser, setEditUser] = useState({
    UserName: "",
    Phone: "",
    Email: "",
    DateOfBirth: "",
    Gender: "",
    Area: "",
    Cinemafavourite: "",
    Roles: "",
    Status: "",
  });
  const handleShow = (id) => {
    const findUser = user.find((e) => e.UserId === id);
    console.log(findUser);
    setEditUser(findUser);
    setShow(true);
  };

  const handleSave = async () => {
    const updateUser = { ...editUser };
    console.log(updateUser);
    await axios.put(`http://localhost:5000/api/v1/users/${editUser.UserId}` , updateUser);
    setShow(false);
    loadUser()
  };

  return (
    <>
      <Navbaradmin></Navbaradmin>
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
          {user?.map((e, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{e.UserName}</td>
              <td>{e.Phone}</td>
              <td>{e.Email}</td>
              <td>{formatDate(e.DateOfBirth)}</td>
              <td>{e.Gender}</td>
              <td>{e.Area}</td>
              <td>{e.Cinemafavourite}</td>
              <td>{e.Roles === 1 ? <p>User</p> : <p>Admin</p>}</td>
              <td>
                {e.Status === 0 ? (
                  <p>Đang hoạt động</p>
                ) : (
                  <p>Ngừng hoạt động</p>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(e.UserId)}>
                  Xóa
                </Button>
              </td>
              <td>
                <Button variant="primary" onClick={() => handleShow(e.UserId)}>
                  Sửa
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <label>Tên</label> <br />
                    <input
                      type="text"
                      className="input"
                      value={editUser.UserName}
                      onChange={(e) =>
                        setEditUser({ ...editUser, UserName: e.target.value })
                      }
                    />
                    <br />
                    <label>Số điện thoại</label> <br />
                    <input
                      type="text"
                      className="input"
                      value={editUser.Phone}
                      onChange={(e) =>
                        setEditUser({ ...editUser, Phone: e.target.value })
                      }
                    />
                    <br />
                    <label>Email</label> <br />
                    <input
                      type="text"
                      className="input"
                      value={editUser.Email}
                      onChange={(e) =>
                        setEditUser({ ...editUser, Email: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    {editUser.Roles === 0 ? (
                      <>
                        <label>Roles</label> <br />
                        <select
                          name="Roles"
                          value={editUser.Roles}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              Roles: +e.target.value,
                            })
                          }
                        >
                          <option value="0">Admin</option>
                          <option value="1">User</option>
                        </select>
                        <br />
                      </>
                    ) : (
                      <>
                        <label>Roles</label> <br />
                        <select
                          name="Roles"
                          value={editUser.Roles}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              Roles: +e.target.value,
                            })
                          }
                        >
                          <option value="1">User</option>
                          <option value="0">Admin</option>
                        </select>
                        <br />
                      </>
                    )}
                    {editUser.Status === 0 ? (
                      <>
                        <label>Status</label> <br />
                        <select
                          name="Status"
                          value={editUser.Status}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              Status: +e.target.value,
                            })
                          }
                        >
                          <option value="0">Khóa</option>
                          <option value="1">Mở khóa</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <label>Status</label> <br />
                        <select
                          name="Status"
                          value={editUser.Status}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              Status: +e.target.value,
                            })
                          }
                        >
                          <option value="0">Khóa</option>
                          <option value="1">Mở khóa</option>
                        </select>
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => handleSave(editUser.UserId)}
                    >
                      Lưu thông tin
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Footer></Footer>
    </>
  );
}

export default Adminuser;
