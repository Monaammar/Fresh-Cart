import React from "react";
import slider2 from "./../../assets/images/slider2.jpg";
import slider3 from "./../../assets/images/slider3.jpg";
import slider4 from "./../../assets/images/slider4.jpg";
import slider5 from "./../../assets/images/slider5.jpg";
import Slider from "react-slick";

function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return (
    <div className="row g-0 m-5 justify-content-center">
      <div className="col-md-3">
      <Slider {...settings}>
    
      <img src={slider2} className="w-100" alt="" />
      <img src={slider3}  className="" alt="" />
        </Slider>
      </div>
      <div className="col-md-3">
      <img src={slider4} width={279}height={224}className="" alt="" />
      <img src={slider5}  width={279}height={224}className="" alt="" />
      </div>
    </div>
  );
}

export default MainSlider;
