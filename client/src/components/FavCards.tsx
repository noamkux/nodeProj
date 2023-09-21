import { FunctionComponent, useEffect, useState } from "react";
import { getUserByid } from "../services/userServices";
import User from "../interfaces/user";
import { getAllCards } from "../services/cardService";
import Card from "../interfaces/card";
import { Link } from "react-router-dom";
import { handleUserFav } from "../services/favoritesService";
import { successMsg, infoMsg } from "../services/feedbackService";
import { motion } from "framer-motion";

interface FavCardsProps {
  userInfo: any;
}

const FavCards: FunctionComponent<FavCardsProps> = ({ userInfo }) => {
  let [cards, setCards] = useState<Card[]>([]);
  let [userDetails, setUserDetails] = useState<User>();
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  const render = () => setDataUpdated(!dataUpdated);
  let deleteFav = (idToDelete: number, userId: number) => {
    handleUserFav(idToDelete, userId)
      .then((res) => {
        if (res) {
          successMsg("Added to favorites");
        } else infoMsg("Removed from favorites");
      })
      .catch((err) => console.log(err));
    render();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardResponse = await getAllCards();
        setCards(cardResponse.data);
        const userResponse = await getUserByid(userInfo.userId);
        setUserDetails(userResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dataUpdated, userInfo.userId]);

  return (
    <div className="component-container">
      <div className="mx-5 mb-4 text-center header">
        <h1 className="display-1">My favorites cards</h1>
        <p className="display-6 fs-4">
          Here you can find the business and services you marked as favorites,
          store right here for easy acssess
        </p>
      </div>

      <div className="container">
        <div className="row">
          {cards.map((card: Card) =>
            userDetails?.favCards?.includes(card._id as number) ? (
              <div className="col-md-4 mb-5 " key={card._id}>
                <div className="card" style={{ width: "100%" }}>
                  <Link to={`/cards/${card._id}`}>
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
                      to={`cards/${card._id}`}
                    >
                      <h5 className="card-title text-center">
                        {card.title.charAt(0).toUpperCase() +
                          card.title.slice(1)}
                      </h5>
                      <p className="card-text display-6 fs-6 text-center mb-3">
                        {card.subtitle}
                      </p>
                    </Link>
                    <a
                      href={"https://" + card.webSite}
                      rel="noreferrer"
                      target="_blank"
                      className="btn btn-primary w-100"
                    >
                      Go To{" "}
                      {card.title.charAt(0).toUpperCase() + card.title.slice(1)}{" "}
                      Website
                    </a>
                    <div className="card-footer text-center">
                      Address :{card.address?.city}, {card.address?.street} {card.address?.houseNumber},{" "}
                      {card.address?.country}
                    </div>
                    <i
                      className="fa-solid fa-heart col-12 text-center"
                      onClick={() =>
                        deleteFav(card._id as number, userInfo.userId)
                      }
                      style={{ cursor: "pointer", color: "red" }}
                    ></i>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FavCards;
