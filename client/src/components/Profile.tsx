  import { FunctionComponent, useEffect, useState } from "react";
  import { getUserByid } from "../services/userServices";
  import User from "../interfaces/user";
  import { useNavigate } from "react-router-dom";

  interface ProfileProps {
    userInfo: any;
  }

  const Profile: FunctionComponent<ProfileProps> = ({ userInfo }) => {
    let [user, setUser] = useState<User>();
    let navigate = useNavigate();

    let navigateHome = () => {
      navigate("/");
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const defaultImageSrc =
        user?.gender === "male"
          ? "images/CardsImg/manProfile.png"
          : "images/CardsImg/womanProfile.png";
  
      event.currentTarget.src = defaultImageSrc;
      event.currentTarget.alt = "Default Profile Image";
    };

    useEffect(() => {
      getUserByid(userInfo.userId)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }, [userInfo.userId]);

    console.log(user);
    
    if (!user) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className="profile-page compenent-container container header my-5">
          <h1>Your Profile</h1>
          <div className="row">
            <div className="col-md-6">
              <h2>{`${user.name?.firstName} ${user.name?.lastName}`}</h2>
              <div className="display-6 fs-5 pt-2">
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Gender: {user.gender}</p>
                <p>
                  Location:{" "}
                  {`${user.address?.city}, ${user.address?.street} ,${user.address?.houseNumber}, ${user.address?.country}`}
                </p>
              </div>
            </div>
            <div className="col-md-6">
                <div className=" justify-content-center align-items-center d-flex">
                    <img
                    alt={user.image?.imageAlt}
                      className="mb-5"
                      src={user.image?.imageURL}
                      onError={handleImageError}
                      style={{ width: "200px", height: "200px" }}
                    ></img>
                
            </div>
                </div>
          </div>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigateHome()}
          >
            Back to Home
          </button>
        </div>
      </>
    );
  };

  export default Profile;
