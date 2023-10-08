import axios from "axios";
import { useFormik } from "formik";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from './../../Context/UserContext';
import { useContext, useState } from 'react';


function LogIn() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  let {setUserToken}=useContext(userContext);
  async function handleSubmit(values) {
    setIsLoading(true);
    console.log(values);

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setIsLoading(false);
        setIsError(error.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
      navigate("/Home");
    }
    console.log(data);
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(/[A-Z][a-z0-9]{3,9}/, "Password is Invalid "),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto mt-5">
        <h2 className="text-success fw-bold">LogIn Now</h2>
        {isError && <div className="alert alert-danger">{isError}</div>}
        <form onSubmit={formik.handleSubmit}>
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
              LogIn
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default LogIn;
