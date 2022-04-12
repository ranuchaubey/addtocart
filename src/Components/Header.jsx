import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { DELETE } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);

  const getdata = useSelector((state) => state.cartreducers.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dlt = (id) => {
    dispatch(DELETE(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty+ price;
    });
    setPrice(price);
  };
  
  useEffect(() => {
    total()

  },[total])
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Go Products</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getdata.length}
            color="secondary"
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping"
              style={{ color: "white", fontSize: 25 }}
            ></i>
          </Badge>
        </Container>
      </Navbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {getdata.length ? (
          <div className="card_details" style={{ width: "24rem", padding: 10 }}>
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img
                              src={e.image}
                              alt=""
                              style={{ width: "5rem", height: "5rem" }}
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>{e.name}</p>
                          <p>Price : {e.price}</p>
                          <p> Quantity: {e.qnty}</p>
                          <p
                            style={{
                              fontSize: 24,
                              cursor: "pointer",
                              color: "#ff0000",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="fas fa-trash smalldelete"></i>
                          </p>
                        </td>
                        <td
                          className="mt-5"
                          style={{
                            fontSize: 24,
                            cursor: "pointer",
                            color: "#ff0000",
                          }}
                          onClick={() => dlt(e.id)}
                        >
                          <i className="fas fa-trash largedelete"></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
                <p className="text-center">Total : Rs. {price} </p>
              </tbody>
            </Table>
          </div>
        ) : (
          <div
            className="card_details d-flex justify-content-center
          align-items-center"
            style={{ width: "20rem", padding: 10, position: "relative" }}
          >
            <i
              onClick={handleClose}
              className="fas fa-close smallclose"
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
            ></i>
            <p style={{ fontSize: 22 }}>Your cart is empty</p>
            <img
              src="./cart.gif"
              alt=""
              className="emptycart_img"
              style={{ width: "5rem", padding: 10 }}
            />
          </div>
        )}
      </Menu>
    </>
  );
};

export default Header;
