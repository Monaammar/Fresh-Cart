import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
function ProductDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState([]);
  const { addToCart,setNumberOfCartItems } = useContext(CartContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:true,
    autoplay:true,
  };
  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    console.log(data.data);
    setDetails(data.data);
  }

  async function addProductToCart(id) {
    let {data} = await addToCart(id);
    console.log(data);
    if(data.status==='success'){
      toast.success(data.message)
      setNumberOfCartItems(data.numOfCartItems)
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="row align-items-center mt-2">
      {console.log(details)}
      <div className="col-md-3">
        <Slider {...settings}>
          {details.images?.map((img) => (
            <img
              src={img}
              className="w-100"
              alt={details.title}
              key={details._id}
            />
          ))}
        </Slider>
      </div>
      <div className="col-md-9">
        <h2>{details.title}</h2>
        <p className="text-muted">{details.description}</p>
        <h6>{details.category?.name}</h6>
        <div className="d-flex mb-2">
          <div className="col-6">{details.price}EGP</div>
          <div className="col-6">
            <i className="fa-solid fa-star"></i>
            {details.ratingsAverage}
          </div>
         
        </div>
        <button className="btn btn-success w-100"onClick={()=>{addProductToCart(id)}}>ADD TO CART</button>
      </div>
    </div>
  );
}

export default ProductDetails;
