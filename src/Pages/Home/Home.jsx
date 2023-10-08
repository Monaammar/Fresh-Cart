import React from "react";
import FeaturedProduct from "../../Components/FeaturedProduct/FeaturedProduct";
import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";

function Home(props) {
  return (
    <div>
      <MainSlider />
      <CategorySlider />
      <FeaturedProduct />
    </div>
  );
}

export default Home;
