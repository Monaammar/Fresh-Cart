import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/images/empty cart.png";
import { ListContext } from "../../Context/WishListContext";

import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

const List = () => {
  const { getLoggedList, deleteListItem } = useContext(ListContext);
  const [data, setData] = useState({});
  const {addToCart}=useContext(CartContext)
  async function deleteItem(id) {
    const { data } = await deleteListItem(id);
    setData(data);
  }
  async function addProductToCart(productid){
    let {data}=await addToCart(productid);
    if (data.status==="success")
    {
      toast.success(data.message);
    }
  }
  // async function addProductToCart(id) {
  //   let { data } = await addToCart(id);
  //   console.log(data);
  //   if (data.status === "success") {
  //     toast.success(data.message);
  //   }
  
  async function getData() {
    let { data } = await getLoggedList();
    // console.log(data.data);
    setData(data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-3 ">
      <h2 className="text-success">Wish List</h2>

      {data?.count > 0 ? (
        data?.data?.map((product) => (
          <div
            className="row align-items-center gy-2 border-bottom py-3"
            key={product._id}
          >
            <div className="col-10">
              <div className="row align-items-center">
                <div className="col-2">
                  <img
                    src={product.imageCover}
                    className="w-100 mb-2"
                    alt={product.title}
                  />
                </div>
                <div className="col-10 mb-2">
                  <h6 className="text-success">{product.title}</h6>
                  <p>{product.price} EGP</p>
                  <p className="cursor-pointer">
                    <i
                      className="fa-solid fa-trash mx-2 text-danger"
                      onClick={() => {
                        deleteItem(product._id);
                      }}
                    ></i>
                    Remove
                  </p>
                </div>
              </div>
            </div>
            <button
              className="btn btn-success w-25 mx-auto"
              onClick={() => {
                addProductToCart(product._id);
              }}
            >
              ADD TO CART
            </button>
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src={emptyCart} className="w-50"></img>
        </div>
      )}
    </div>
  );
};
export default List;
