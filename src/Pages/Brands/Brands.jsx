import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
function Brands() {
    const [brands, setBrands] = useState([]);
    async function getAllBrands() {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      console.log(data.data);
      setBrands(data.data);
    }
  
    useEffect(() => {
      getAllBrands();
    });
    return (
      <div className="row my-4">
         <div className="col-12">
         <h1 className="text-success text-center mb-5">All Brands</h1>
         </div>
        {console.log(brands)}
  
        {brands.length > 0 ? (
          brands.map((product) => (
            
            <div className="col-3">
                
              <Link className="text-decoration-none" to={""}>
                <div className="inner product p-3 rounded text-black border shadow p-3 mb-5 bg-white rounded ">
                  
                  <img
                    // height={300}
                    src={product.image}
                    className="w-100 img-fluid  "
                    alt={product.slug}
                  ></img>
                  <p className="text-success text-center my-2">{product.name}</p>
  
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

export default Brands