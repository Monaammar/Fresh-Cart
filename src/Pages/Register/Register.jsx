import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(values) {
    setIsLoading(true);
    console.log(values);

    let { data } = await axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((error) => {
        setIsLoading(false);
        setIsError(error.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(true);
      navigate("/LogIn");
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3).max(20),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(/[A-Z][a-z0-9]{3,9}/, "Password is Invalid "),
      rePassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")]),
      phone: Yup.string()
        .required()
        .matches(/^01[0125]\d{8}$/, "Phone is Invalid"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto ">
        <h2 className="">Register Now</h2>
        {isError && <div className="alert alert-danger">{isError}</div>}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group my-2">
            <label htmlFor="rePassword">rePassword</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="form-control"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group my-2">
            <label htmlFor="phone">Phone</label>
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
          {isLoading ? (
            <button className="btn btn-success">
              <FallingLines
                color="#000"
                width="25"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            </button>
          ) : (
            <button type="submit" className=" btn btn-success">
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
