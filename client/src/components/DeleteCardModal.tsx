import { FunctionComponent, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { successMsg, infoMsg } from "../services/feedbackService";
import { motion } from "framer-motion";
import { deleteCard } from "../services/cardService";
import { SiteTheme } from "../App";

interface EditRoleModalProps {
  cardId: number;
  dataUpdated: boolean;
  setDataUpdated: Function;
}

const EditRoleModal: FunctionComponent<EditRoleModalProps> = ({
  cardId,
  dataUpdated,
  setDataUpdated,
}) => {
  let theme = useContext(SiteTheme);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleDelete = (id: number) => {
    deleteCard(id)
      .then((res) => {
        successMsg("Card deleted sucssesfully");
      })
      .catch((err) => {
        console.log(err);
        infoMsg("somthing went wrong");
      });
    handleClose();
    setDataUpdated(!dataUpdated);
  };

  return (
    <>
      <motion.i
        className="fa-solid fa-lg fa-trash col-4"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
        whileHover={{ scale: 1.2 }}
      ></motion.i>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={`${theme}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure you want to Delete This Card ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={() => {
              handleDelete(cardId as number);
            }}
          >
            Delete
          </Button>

          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={handleClose}
          >
            Back
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditRoleModal;
