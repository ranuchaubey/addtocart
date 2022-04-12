import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Productdata from "./Productdata";
import "./Style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
const Products = () => {
  const [product, setProduct] = useState(Productdata);
  // if we want to trigger fun which is in action then we use dispatch
  const dispatch = useDispatch();
  const senddata = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center" style={{ color: "#ff4757" }}>
        Add To Cart Products
      </h2>
      <div className="row d-flex justify-content-center align-items-center">
        {product.map((item, id) => {
          return (
            <Card
              style={{ width: "22rem", border: "none" }}
              className="mt-4 mx-2 card_style"
            >
              <Card.Img
                variant="top"
                src={item.image}
                style={{ height: "16rem" }}
                className="mt-3"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text> Price : Rs. {item.price}</Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button
                    variant="info"
                    className="col-lg-12"
                    onClick={() => senddata(item)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
