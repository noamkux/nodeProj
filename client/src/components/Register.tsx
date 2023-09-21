import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { successMsg, errorMsg } from "../services/feedbackService";
import { addUser, getTokenDetails } from "../services/userServices";
import * as yup from "yup";
import User from "../interfaces/user";
import { motion } from "framer-motion";

interface RegisterProps {
  userInfo: User;
  setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({
  userInfo,
  setUserInfo,
}) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      email: "",
      password: "",
      phone: "",
      image: {
        imageURL: "",
        imageAlt: "",
      },
      address: {
        country: "",
        city: "",
        state: "",
        street: "",
        houseNumber: "",
      },
      gender: "",
      role: "",
    },

    validationSchema: yup.object({
      email: yup.string().required().email("Invalid email"),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/,
          "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
      name: yup.object({
        firstName: yup
          .string()
          .required()
          .min(2, "Too short! First Name should be at least 2 characters"),
        middleName: yup
          .string()
          .min(2, "Too short! middle Name should be at least 2 characters"),
        lastName: yup
          .string()
          .required()
          .min(2, "Too short! last Name should be at least 2 characters"),
      }),
      phone: yup
        .string()
        .required()
        .min(9, "phone must have at least 9 digits")
        .max(10, "phone must have at most 10 digits"),
      image: yup.object({
        imageURL: yup.string(),
        imageAlt: yup.string(),
      }),
      address: yup.object({
        state: yup.string(),
        country: yup
          .string()
          .min(3, "country must have at least 3 letters")
          .required(),
        city: yup
          .string()
          .min(2, "city must have at least 3 letters")
          .required(),
        houseNumber: yup.number().required(),
        street: yup.string().required(),
      }),
      gender: yup.string().required(),
      role: yup.string(),
    }),
    onSubmit: (values: User) => {
      if (values.role?.toString() === "true") {
        values.role = "business";
      } else values.role = "nonbusiness";

      addUser(values)
        .then((res) => {
          navigate("/");
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
          successMsg(
            `Welcom ${values.name?.firstName} ${values.name?.lastName}`
          );
        })
        .catch((err) => {console.log(err)
        errorMsg("Something went wrong, please try again");
        });
    },
  });
  return (
    <>
      <div className="w-100 container">
        <form onSubmit={formik.handleSubmit} className="text-center">
          <h3 className="display-3 container text-center header">Register</h3>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="text"
                name="name.firstName"
                className="form-control"
                id="floatingInputFirstName"
                placeholder="israel"
                onChange={formik.handleChange}
                value={formik.values.name?.firstName}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInputFirstName">First Name*</label>
              {formik.touched.name && formik.errors.name && (
                <p className="text-danger">
                  {(formik.errors.name as any).firstName}
                </p>
              )}
            </div>
            <div className=" g-2 form-floating col-6">
              <input
                name="name.middleName"
                type="text"
                className="form-control"
                id="floatingPasswordMiddleName"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.name?.middleName}
                onBlur={formik.handleBlur}
              ></input>
              <label htmlFor="floatingPassword">middle name</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="text"
                name="name.lastName"
                className="form-control"
                id="floatingInputLastName"
                placeholder="israel"
                onChange={formik.handleChange}
                value={formik.values.name?.lastName}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInputLastName">Last Name*</label>
              {formik.touched.name && formik.errors.name && (
                <p className="text-danger">
                  {(formik.errors.name as any).lastName}
                </p>
              )}
            </div>
            <div className=" g-2 form-floating col-6">
              <input
                name="phone"
                type="tel"
                className="form-control"
                id="floatingNumber"
                placeholder="+97252000000"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              ></input>
              <label htmlFor="floatingNumber">Phone Number*</label>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-danger">{formik.errors.phone}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="email"
                name="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInput">Email address*</label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-danger">{formik.errors.email}</p>
              )}
            </div>
            <div className=" g-2 form-floating col-6">
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
              <label htmlFor="floatingPassword">Password*</label>
              {formik.touched.password && formik.errors.password && (
                <p className="text-danger">{formik.errors.password}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="text"
                name="image.imageURL"
                className="form-control"
                id="floatingInputImageURL"
                placeholder="Image Url"
                onChange={formik.handleChange}
                value={formik.values.image?.imageURL}
                onBlur={formik.handleBlur}
              />

              <label htmlFor="floatingInputImageURL">Image URL</label>
            </div>
            <div className=" g-2 form-floating col-6">
              <input
                name="image.imageAlt"
                type="text"
                className="form-control"
                id="imageAlt"
                placeholder="Image Alt"
                onChange={formik.handleChange}
                value={formik.values.image?.imageAlt}
                onBlur={formik.handleBlur}
              ></input>

              <label htmlFor="floatingInputImageALT">Image Description</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="text"
                name="address.state"
                className="form-control"
                id="floatingInputstate"
                placeholder="State"
                onChange={formik.handleChange}
                value={formik.values.address?.state}
                onBlur={formik.handleBlur}
              />

              <label htmlFor="floatingInputState">State</label>
            </div>
            <div className=" g-2 form-floating col-6">
              <input
                name="address.country"
                type="text"
                className="form-control"
                id="country"
                placeholder="country"
                onChange={formik.handleChange}
                value={formik.values.address?.country}
                onBlur={formik.handleBlur}
              ></input>
              <label htmlFor="country">Country*</label>
              {formik.touched.address && formik.errors.address && (
                <p className="text-danger">
                  {(formik.errors.address as any).country}
                </p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="text"
                name="address.city"
                className="form-control"
                id="floatingInputCity"
                placeholder="Tel aviv"
                onChange={formik.handleChange}
                value={formik.values.address?.city}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInputCity">City*</label>
              {formik.touched.address && formik.errors.address && (
                <p className="text-danger">
                  {(formik.errors.address as any).city}
                </p>
              )}
            </div>
            <div className=" g-2 form-floating col-6">
              <input
                name="address.street"
                type="text"
                className="form-control"
                id="street"
                placeholder="street"
                onChange={formik.handleChange}
                value={formik.values.address?.street}
                onBlur={formik.handleBlur}
              ></input>
              <label htmlFor="street">street*</label>
              {formik.touched.address && formik.errors.address && (
                <p className="text-danger">
                  {(formik.errors.address as any).street}
                </p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="g-2 form-floating col-6">
              <input
                type="text"
                name="address.houseNumber"
                className="form-control"
                id="floatingInputhouseNumber"
                placeholder="House Number"
                onChange={formik.handleChange}
                value={formik.values.address?.houseNumber}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInputhouseNumber">House Number*</label>
              {formik.touched.address && formik.errors.address && (
                <p className="text-danger">
                  {(formik.errors.address as any).houseNumber}
                </p>
              )}
            </div>
            <div className=" g-2 form-floating col-6">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                value={formik.values.gender}
                onBlur={formik.handleBlur}
                name="gender"
              >
                <option value={""}>Open this select menu</option>
                <option value={"female"}>Female</option>
                <option value={"male"}>Male</option>
              </select>

              <label htmlFor="gender">gender*</label>
            </div>
          </div>
          <div
            className="form-check "
            style={{
              inlineSize: "fit-content",
            }}
          >
            <label
              className="form-check-label header"
              htmlFor="flexCheckDefault"
            >
              Register As Buissness
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              name="role"
              id="flexCheckDefault"
              onChange={formik.handleChange}
              value={formik.values.role}
              onBlur={formik.handleBlur}
            />
          </div>

          <motion.button
            type="submit"
            className="btn btn-success mt-4 w-100"
            disabled={!formik.isValid || !formik.dirty}
            whileHover={{ scale: 1.1 }}
          >
            Register
          </motion.button>
        </form>
        <Link to="/login">
          <p className="text-center mt-3 mb-0 pb-5">Already user? Login here</p>
        </Link>
      </div>
    </>
  );
};

export default Register;
