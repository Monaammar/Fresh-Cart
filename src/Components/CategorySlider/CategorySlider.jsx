import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "react-query";

function CategorySlider() {
  const [Categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { isError, isLoading, data } = useQuery("category", getCategories);

  // async function getCategories() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/categories"
  //   );
  //   setCategories(data.data);
  //   console.log(data.data)
  // }

  // useEffect(() => {
  //   getCategories();

  // }, )

  return (
    <div className="mb-5">
      <Slider {...settings}>
        {data?.data.data.map((category) => (
          <img
            src={category.image}
            alt={category.name}
            className="w-100"
            height={200}
          />
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
