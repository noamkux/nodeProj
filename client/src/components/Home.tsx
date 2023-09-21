import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/card";
import { getAllCards } from "../services/cardService";
import { Link, useNavigate } from "react-router-dom";
import { handleUserFav } from "../services/favoritesService";
import { getUserByid } from "../services/userServices";
import { SiteTheme } from "../App";
import { infoMsg, successMsg } from "../services/feedbackService";
import { motion } from "framer-motion";
import DeleteCardModal from "./DeleteCardModal";

interface HomeProps {
  userInfo: any;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo }) => {
  let [cards, setCards] = useState<Card[]>([]);
  let [favoritesCards, setFavoriteCards] = useState<number[]>();
  let theme = useContext(SiteTheme);
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated);
  let navigate = useNavigate()
  let handleFav = async (cardId: number) => {
    try {
      const response = await handleUserFav(cardId, userInfo.userId);
      if (response) {
        successMsg("Added to favorites");
      } else infoMsg("Removed from favorites");
      render();
    } catch (error) {
    }
  };
  useEffect(() => {
    getAllCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));  
      if (userInfo.email){
    getUserByid(userInfo.userId)
      .then((res) => setFavoriteCards(res.data.favCards))
      .catch((err) => console.log(err));}
    
  }, [dataUpdated, userInfo.email, userInfo.userId]);

  return (
    <>
      <div className={`mx-5 mb-4 text-center header`}>
        <h1 className="display-1">Welcom To BCard</h1>
        <p className="display-6 fs-4">
          Here you can find business and services of all kind, you can take a
          look and find the right professional for your job or advertise your
          own buissnes
        </p>
      </div>
      <hr className="hr" />
      {cards.length ? (
        <div className="container">
          <div className="row">
            {cards.map((card: Card) => (
              <div className="col-lg-4 mb-3" key={card._id}>
                <div className={`card theme${theme}`} style={{ width: "100%" }}>
                  <Link to={`cards/${card._id}`}>
                    <motion.img
                      whileHover={{ height: 200 }}
                      transition={{ delay: 0.5 }}
                      src={card.image?.businessImgURL}
                      className="card-img-top"
                      alt={card.image?.businessImgAlt}
                      style={{ height: "8rem", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/cards/${card._id}`}
                    >
                      <h5
                        className={`card-title text-center theme-text${theme}`}
                      >
                        {card.title.charAt(0).toUpperCase() +
                          card.title.slice(1)}
                      </h5>
                      <p
                        className={`card-text display-6 fs-6 text-center mb-3 theme-text${theme}`}
                      >
                        {card.subtitle}
                      </p>
                    </Link>
                    <p className="card-text" style={{ height: "5rem" }}>
                      {card.description}
                    </p>
                    <div
                      className="d-flex justify-content-center text-decoration-none"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        style={{ width: "80%" }}
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/cards/${card._id}`)}
                      >
                        Click Here For More Details
                      </motion.button>
                    </div>
                    <div className="card-footer text-center">
                      <p className="mb-3">
                        Address :{card.address?.city}, {card.address?.street} {card.address?.houseNumber},{" "}
                        {card.address?.country}
                      </p>
                      <div className="text-center mt-1">
                        {(userInfo.role === "admin" ||
                          userInfo.userId === card.ownerId) && (
        
                          <DeleteCardModal
                            cardId={card._id as number}
                            dataUpdated={dataUpdated}
                            setDataUpdated={setDataUpdated} 
                            
                        />)}
                        {userInfo.email &&
                          (favoritesCards?.includes(card._id as number) ? (
                            <motion.i
                              className="fa-solid fa-heart fa-lg col-4"
                              onClick={() => handleFav(card._id as number)}
                              style={{ cursor: "pointer", color: "red" }}
                              whileHover={{ scale: 1.5 }}
                            ></motion.i>
                          ) : theme === "" ? (
                            <motion.i
                              className="fa-solid fa-heart fa-lg col-4"
                              onClick={() => handleFav(card._id as number)}
                              style={{ cursor: "pointer", color: "black" }}
                              whileHover={{ scale: 1.5 }}
                            ></motion.i>
                          ) : (
                            <motion.i
                              className="fa-solid fa-heart fa-lg col-4"
                              onClick={() => handleFav(card._id as number)}
                              style={{
                                cursor: "pointer",
                                color: "white",
                              }}
                              whileHover={{ scale: 1.5 }}
                            ></motion.i>
                          ))}
                        <Link to={`tel:${card.phone}`}>
                          <motion.i
                            whileHover={{ scale: 1.5 }}
                            className={`fa-solid fa-lg fa-phone phone${theme} col-4`}
                          ></motion.i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p>No cards to display</p>
        </>
      )}
    </>
  );
};

export default Home;
