import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import User from "../interfaces/user";
import { getUserByid } from "../services/userServices";

interface NavBarProps {
  userInfo: any;
  setUserInfo: Function;
  darkMode: boolean;
  setDarkMode: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({
  userInfo,
  setUserInfo,
  darkMode,
  setDarkMode,
}) => {
  let navigate = useNavigate();

  let [userDetails, setUserDetails] = useState<User>();
  let handleLogout = () => {
    setUserInfo("");
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (userInfo.userId){
      getUserByid(userInfo.userId)
        .then((res) => setUserDetails(res.data))
        .catch((err) => console.log(err));
      }
    
  }, [userInfo.userId]);

  

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-1" to={"/"}>
            BCARD
          </NavLink>
          <>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to={"/about"}>
                    ABOUT <span className="sr-only">(current)</span>
                  </NavLink>
                </li>

                {(userInfo.role === "business" ||
                  userInfo.role === "nonbusiness" ||
                  userInfo.role === "admin") && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/favcards"}>
                        FAVCARDS
                      </NavLink>
                    </li>
                  </>
                )}
                {(userInfo.role === "business" ||
                  userInfo.role === "admin") && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/mycards"}>
                        MYCARDS
                      </NavLink>
                    </li>
                  </>
                )}

                {userInfo.role === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/sandbox"}>
                      SANDBOX
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </>

          <form className="d-flex justify-content-end navbar-icons" role="search">
            {userInfo.email && (
              <>
                <button
                  className="btn btn-outline-primary me-3"
                  type="submit"
                  onClick={handleLogout}
                >
                  log-out
                </button>
              </>
            )}
            {!userInfo.email && (
              <>
                <NavLink
                  to={"/register"}
                  className="btn btn-outline-primary me-3"
                  type="submit"
                >
                  Sign-Up
                </NavLink>

                <NavLink
                  to={"/login"}
                  className="btn btn-outline-primary me-3"
                  type="submit"
                >
                  Login
                </NavLink>
              </>
            )}
            {(userInfo.role === "business" ||
              userInfo.role === "nonbusiness" ||
              userInfo.role === "admin") && (
              <div className="nav-link text-white me-3 pt-1">
                <NavLink className="nav-link" to={"/profile"}>
                  {userDetails?.gender === "male" ? (
                    <img
                      alt="user profile pic"
                      className="mx-2"
                      src="images/CardsImg/manProfile.png"
                      style={{ width: "30px", height: "30px" }}
                    ></img>
                  ) : (
                    <img
                      alt="user profile pic"
                      className="mx-2"
                      src="images\CardsImg\womanProfile.png"
                      style={{ width: "30px", height: "30px" }}
                    ></img>
                  )}
                </NavLink>
              </div>
            )}
            <i
              className="fa-xl me-3 mt-3 fa-solid fa-glasses"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              style={{ cursor: "pointer", color: "white" }}
              title="Toggle Dark Mode"
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
