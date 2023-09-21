import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../interfaces/card";
import { getCardById } from "../services/cardService";
import GoogleMapComponent from "./GoogleMapComponent";
import { motion } from "framer-motion";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
  let [currentCard, setCurrentCard] = useState<Card>();
  let { cardId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardResponse = await getCardById(cardId as string);
        setCurrentCard(cardResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    
  }, [cardId]);
  return (<>
  
  {currentCard ? (
    
    <div className="component-container card-details-container">
      <div className="mx-5 mb-4">
        <h1 className="display-1 header">{currentCard?.title} Details</h1>
      </div>
      <hr className="hr" />
      <div className="row m-0">
        <div className="col-md-6 p-0">
          <h5 className="display-5 header">
            {currentCard?.email} - {currentCard?.phone}
          </h5>
          <p className="display-6 fs-4 text">{currentCard?.subtitle}</p>
          <p className="display-6 fs-4 text">{currentCard?.description}</p>
          
        <a
            href={"https://" + currentCard.webSite}
            rel="noreferrer"
            target="_blank"
            className="text-decoration-none"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              style={{ width: "90%"}}
              className="btn btn-outline-primary my-3"
            >
              Go To {currentCard.title.charAt(0).toUpperCase() + currentCard.title.slice(1)}{" "}
              Website
            </motion.button>
          </a>
          <p className="text">
            Located at Address :{currentCard.address?.city}, {currentCard.address?.street}{" "}
            {currentCard.address?.houseNumber}, {currentCard.address?.country}
          </p>
          <div className="map-container">
            <GoogleMapComponent
              city={currentCard.address?.city as string}
              street={currentCard.address?.street as string}
              houseNumber={currentCard.address?.houseNumber as string}
              apiKey="AIzaSyBCC0p8BEYu5p51WHCJXpBRaKF93XeLm8I"
            />
             
          </div>
        </div>
        <div className="col-md-5 p-0">
          <img
            className="cardDetailsImg rounded-3"
            src={currentCard.image?.businessImgURL}
            alt={currentCard.image?.businessImgAlt}
            style={{ width: "100%", height: "50vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
    
    ) : (<>Loading...</>)}
  
  
  </>  
  );
};

export default CardDetails;
