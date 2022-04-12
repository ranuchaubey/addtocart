import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {  useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE,ADD,REMOVE } from "../redux/actions/action"
import "./Style.css";
const ProductsDetails = () => {
  const [product, setProduct] = useState([]);
  const history = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  const getdata = useSelector((state) => state.cartreducers.carts);
  // console.log(getdata)
  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e.id == id;
    });
    // console.log(compareData)
    setProduct(compareData);
  };
// inceremnt data
  const senddata = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  
  useEffect(() => {
    compare();
  }, [id]);

  const dlt = (id) => {
    dispatch(DELETE(id))
    history("/")
  }

// decrement item
  const decrementItem = (item) => {
    dispatch(REMOVE(item))
  }
  return (
    <div className="container mt-2">
      <h2 className="text-center" style={{ color: "#833471" }}>
        Product Details
      </h2>
      <section className="container mt-3">
        <div className="itemdetails">
          {product.map((ele) => {
            return (
              <>
                <div className="item_img">
                  <img src={ele.image} alt="" />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          <strong>Name </strong>: {ele.name}
                        </p>
                        <p>
                          <strong>Price : </strong> Rs. {ele.price}
                        </p>
                        <p>
                          <strong>Brand : </strong> {ele.Brand}
                        </p>
                        <p>
                          <strong>Total : </strong> Rs. {ele.price*ele.qnty}
                        </p>

                        <div
                          className="mt-5 d-flex justify-content-between align-items-center"
                          style={{
                            background: "#ddd",
                            width: 100,
                            cursor: "pointer",
                            color: "#111",
                            borderRadius: 5,
                          }}
                        >
                          <span style={{ fontSize: 24 }}onClick={ele.qnty<=1 ? ()=>dlt(ele.id):()=>decrementItem(ele)}> - </span>
                          <span style={{ fontSize: 22 }}>{ ele.qnty}</span>
                          <span style={{ fontSize: 24 }}onClick={()=>senddata(ele)}> + </span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <strong>Rating : </strong>
                          <span style={{ background: "green" }}>
                            {" "}
                            {ele.rating} ★{" "}
                          </span>
                        </p>
                        <p>
                          <strong>Color : </strong>
                          <span> {ele.color}</span>
                        </p>
                        <p>
                          <strong>Remove : </strong>
                          <span>
                            {" "}
                            <i
                              class="fa-solid fa-trash"
                              style={{ color: "#ff0000", fontSize: 22 }}
                              onClick={() => dlt(ele.id)}
                            ></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductsDetails;
