import React from "react";
import notFound from "../../assets/images/notfound.png";
function NotFound() {
  return (
    <div>
      <div className="row justify-content-center text-center mt-4">
        {" "}
        <div className="col-12">
          <img src={notFound} className="w-50" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
