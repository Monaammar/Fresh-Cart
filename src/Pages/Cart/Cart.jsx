import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../Context/CartContext";
import emptyCart from "../../assets/images/empty cart.png";
import style from "./Cart.module.css";
const Cart = () => {
  const {
    getLoggedCart,
    deleteCartItem,
    updateCartQuantity,
    setNumberOfCartItems,
  } = useContext(CartContext);
  const [data, setData] = useState({});

  async function updateCount(count, id) {
    const { data } = await updateCartQuantity(count, id);
    // console.log(data);
    setData(data);
    setNumberOfCartItems(data.numOfCartItems);
    console.log(setNumberOfCartItems);
  }
  async function deleteItem(id) {
    const { data } = await deleteCartItem(id);
    // console.log(data);
    setData(data);
    setNumberOfCartItems(data.numOfCartItems);
  }

  async function getData() {
    let { data } = await getLoggedCart();
    console.log(data);
    setData(data);
    setNumberOfCartItems(data.numOfCartItems);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-3 ">
      {console.log(data)}
      <h2 className="text-success">Shop Cart</h2>
      {data?.numOfCartItems > 0 ? (
        <>
          {" "}
          <p className="text-success">
            Total Cart Price : {data?.data?.totalCartPrice} EGP
          </p>
          {data?.data?.products.map((product) => (
            <div
              className="row align-items-center gy-2 border-bottom py-3"
              key={product.product._id}
            >
              <div className="col-10">
                <div className="row align-items-center">
                  <div className="col-2">
                    <img
                      src={product.product.imageCover}
                      className="w-100 mb-2"
                      alt={product.product.title}
                    />
                  </div>
                  <div className="col-10 mb-2">
                    <h6 className="text-success">{product?.product?.title}</h6>
                    <p>{product.price} EGP</p>
                    <p className="cursor-pointer">
                      <i
                        className="fa-solid fa-trash mx-2 text-danger"
                        onClick={() => {
                          deleteItem(product.product.id);
                        }}
                      ></i>
                      Remove
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2 d-flex align-items-center">
                <button
                  className="btn-sm text-success"
                  onClick={() => {
                    updateCount(product.count + 1, product.product.id);
                  }}
                >
                  +
                </button>
                <p className="mx-2 mb-0 ">{product.count}</p>
                <button
                  className="btn-sm text-success"
                  onClick={() => {
                    updateCount(product.count - 1, product.product.id);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-success my-3">
            <Link to={"/CheckOut"} className={` link-unstyled text-black ${style.test}`}>
              CheckOut
            </Link>
          </button>
        </>
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src={emptyCart} className="w-50"></img>
        </div>
      )}
    </div>
  );
};
export default Cart;
