import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

function Categories() {
  const [categories, setCategories] = useState([]);
  async function getAllCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data.data);
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  });
  return (
    <div className="row my-4">
      {console.log(categories)}

      {categories.length > 0 ? (
        categories.map((product) => (
          <div className="col-4">
            <Link className="text-decoration-none" to={""}>
              <div className="inner product p-3 rounded text-black border shadow p-3 mb-5 bg-white rounded ">
                <img
                  height={300}
                  src={product.image}
                  className="w-100 mb-3 "
                  alt={product.slug}
                ></img>
                <h3 className="text-success text-center my-2">
                  {product.name}
                </h3>
              </div>
            </Link>
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

export default Categories;
