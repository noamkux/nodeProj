import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface FooterProps {
  userInfo: any;
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo }) => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted mt-5 footer">
      <section className="pt-3">
        <div className="container text-center text-md-start mt-4 header">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>BCard
              </h6>
              <p>
                Welcome to BCard, your platform for discovering and connecting
                with businesses and service providers. Find professionals for
                your needs or showcase your own business.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Explore</h6>
              <p>
                <NavLink to="/about" className="text-reset">
                  About Us
                </NavLink>
              </p>

              {userInfo.email && (
                <>
                  <p>
                    <NavLink to="/favcards" className="text-reset">
                      Favorite Cards
                    </NavLink>
                  </p>

                  {userInfo.role === "business" && (
                    <p>
                      <NavLink to="/mycards" className="text-reset">
                        My Cards
                      </NavLink>
                    </p>
                  )}
                </>
              )}
              {userInfo.role === "admin" && (
                <p>
                  <NavLink to="/sandbox" className="text-reset">
                    Sandbox
                  </NavLink>
                </p>
              )}
              {!userInfo && (
                <>
                  <NavLink to={"/register"} className="text-reset">
                    <p>Sign-Up</p>
                  </NavLink>

                  <NavLink to={"/login"} className="text-reset">
                    <p>Login</p>
                  </NavLink>
                </>
              )}
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Connect</h6>
              <p>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@bcard.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {new Date().getFullYear()} BCard. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
