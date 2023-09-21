import { useFormik } from "formik";
import { FunctionComponent} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  checkUser,
  getTokenDetails,
  loginWithGoogle,
} from "../services/userServices";
import { successMsg, errorMsg } from "../services/feedbackService";
import User from "../interfaces/user";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

interface LoginProps {
  userInfo: User;
  setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({ userInfo, setUserInfo }) => {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email("Invalid email"),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/,
          "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
    }),
    onSubmit: (values) => {
      checkUser(values)
        .then((res) => {
          sessionStorage.setItem("token", JSON.stringify({ token: res.data }));
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              email: (getTokenDetails() as any).email,
              role: (getTokenDetails() as any).role,
              userId: (getTokenDetails() as any)._id,
            })
          );
          setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
          navigate("/");
          successMsg(
            `Welcom back ${
              JSON.parse(sessionStorage.getItem("userInfo") as string).email
            }`
          );
        })
        .catch((err) => {
          console.log(err);
          errorMsg("Invalid email or password");
        });
    },
  });

  return (
    <div className="component-container">
      <div className="w-50 container">
        <form
          onSubmit={formik.handleSubmit}
          className="text-center"
          autoComplete="off"
        >
          <h3 className="display-3 container text-center header">Login</h3>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingEmailInput"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingEmailInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
            <motion.button
              type="submit"
              className="btn btn-success mt-4 w-100"
              disabled={!formik.isValid || !formik.dirty}
              whileHover={{ scale: 1.1 }}
            >
              Login
            </motion.button>

            <GoogleLogin
              onSuccess={(res) => {
                const USER_CREDENTIAL = jwtDecode(res.credential as any);
                loginWithGoogle((USER_CREDENTIAL as any).email)
                  .then((res) => {
                    sessionStorage.setItem(
                      "token",
                      JSON.stringify({ token: res.data })
                    );
                    sessionStorage.setItem(
                      "userInfo",
                      JSON.stringify({
                        email: (getTokenDetails() as any).email,
                        role: (getTokenDetails() as any).role,
                        userId: (getTokenDetails() as any)._id,
                      })
                    );
                    setUserInfo(
                      JSON.parse(sessionStorage.getItem("userInfo") as string)
                    );
                    navigate("/");
                    successMsg(
                      `Welcom back ${
                        JSON.parse(sessionStorage.getItem("userInfo") as string)
                          .email
                      }`
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                    errorMsg("Invalid email or password");
                  });
              }}
              onError={() => {
                console.log("failed to connect");
              }}
            ></GoogleLogin>
          </div>
        </form>

        <Link to="/register">
          <p className="text-center mt-3">New user? Register here</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
