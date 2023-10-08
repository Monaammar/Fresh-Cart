import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup";

function CheckOut() {
  const [isError, setIsError] = useState(null);
  const { OnlinePayment, cartId } = useContext(CartContext);

  async function handleSubmit(values) {
    console.log(values);
    const { data } = await OnlinePayment(cartId, values);
    console.log(data);
    if (data.status === "success") {
      console.log(data.session.url);
      window.location.href = data.session.url;
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: Yup.object({
      details: Yup.string().required(),
      phone: Yup.string()
        .required()
        .matches(/^01[0125]\d{8}$/, "Phone is Invalid"),
      city: Yup.string().required(),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <h3 className="my-3 text-success fw-bold">CheckOut</h3>
      {isError && <div className="alert alert-danger">{isError}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label for="details" className="form-label">
            Details
          </label>
          <input
            type="text"
            name="details"
            id="details"
            className="form-control"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="alert alert-danger">{formik.errors.details}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label for="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label for="city" className="form-label">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="alert alert-danger">{formik.errors.city}</div>
          ) : null}
        </div>
        <button className="btn btn-success my-3">Pay Now</button>
      </form>
    </div>
  );
}

export default CheckOut;
