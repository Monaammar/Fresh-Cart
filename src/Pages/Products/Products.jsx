import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { MagnifyingGlass } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import style from './Products.module.css'
function Products() {
  const [products, setProducts] = useState([]);
  async function getAllProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  }

  useEffect(() => {
    getAllProducts();
  });
  const { addToCart, setNumberOfCartItems } = useContext(CartContext);
  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    console.log(data);
    if (data.status === "success") {
      toast.success(data.message);
      
    }
  }
  return (
    <div className="row my-4">
      {console.log(products)}

      {products.length > 0 ? (
        products.map((product) => (
          <div className={`col-md-2 mb-5 border ${style.card} mx-3`}key={product._id}>
            <Link
              className="text-decoration-none"
              to={`/ProductDetails/${product._id}`}
            >
              <div className="inner product p-3 rounded text-black ">
                <img
                  src={product.imageCover}
                  className="w-100"
                  alt={product.title}
                ></img>
                <h4 className="h6 my-2">{product.category.name}</h4>
                <h3 className="h6 fw-bold">
                  {product.title.split(" ", 2).join(" ")}
                </h3>
                <div className="d-flex justify-content-between p-2">
                  <small className="col-6 ">{product.price} EGP</small>
                  <div className="col-6 px-1">
                    <i className="fa-solid fa-star"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
              </div>
            </Link>
            <button
              className="btn btn-success w-100 mb-3"
              onClick={() => {
                addProductToCart(product._id);
              }}
            >
              ADD TO CART
            </button>
          </div>
        ))
      ) : (
        <div className="d-flex w-100 justify-content-center">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0cfff"
            color="#e15b64"
          />
        </div>
      )}
    </div>
  );
}

export default Products;
