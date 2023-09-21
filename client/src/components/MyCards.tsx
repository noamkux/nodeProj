import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/card";
import { getCardsByUserId } from "../services/cardService";
import { Link } from "react-router-dom";
import EditCardModal from "./EditCardModal";
import { SiteTheme } from "../App";
import DeleteCardModal from "./DeleteCardModal";

interface MyCardsProps {
  userInfo: any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo }) => {
  let [userCards, setUserCards] = useState<Card[]>([]);
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let theme = useContext(SiteTheme);

  
  useEffect(() => {
    getCardsByUserId()
      .then((res) => setUserCards(res.data[0]))
      .catch((err) => console.log(err));
      
  }, [dataUpdated]);

  
  return (
    <div className="component-container">
      <div className="mx-5 mb-4 text-center header">
        <h1 className="display-1">My Cards</h1>
        <p className="display-6 fs-4">
          Here you can edit the card you have posted and more if nedeed
        </p>
      </div>
      <hr className={`hr${theme}`} />
      <div className="container">
        <Link to={"/addnewcard"} className="mb-3 btn btn-success">
          <i className="fa-solid fa-plus"></i> Add New Card
        </Link>
        {userCards.length ? (
          <table
            className={`${theme === "-dark" ? "table table-dark" : "table"}`}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Post Title</th>
                <th scope="col">Posted At</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userCards.map((card: Card, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{card.title}</td>
                  <td>{card.postDate}</td>
                  <td>
                    <EditCardModal
                      cardId={card._id as any}
                      userInfo={userInfo}
                      dataUpdated={dataUpdated}
                      setDataUpdated={setDataUpdated}
                    />
                  </td>
                  <td>
                    <DeleteCardModal
                      cardId={card._id as number}
                      dataUpdated={dataUpdated}
                      setDataUpdated={setDataUpdated}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="display-3 fs-2 text-center header">
            it seems you haven't posted any card yet, click the add a new card
            button to post your business
          </h2>
        )}
      </div>
    </div>
  );
};

export default MyCards;
