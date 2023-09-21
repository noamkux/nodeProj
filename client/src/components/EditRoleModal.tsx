import { FunctionComponent, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import User from "../interfaces/user";
import { getUserByid, updateUserById } from "../services/userServices";
import { successMsg, errorMsg } from "../services/feedbackService";
import { motion } from "framer-motion";
import { SiteTheme } from "../App";

interface EditRoleModalProps {
  userId: number;
  dataUpdated: boolean;
  setDataUpdated: Function;
}

const EditRoleModal: FunctionComponent<EditRoleModalProps> = ({
  userId,
  dataUpdated,
  setDataUpdated,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userDetails, setUserDetails] = useState<User>();
  const [selectedRole, setSelectedRole] = useState<string>("");
  let theme = useContext(SiteTheme);
  
  const handleChangeRole = () => {
    if (userDetails) {
      const updatedUser: User = { ...userDetails, role: selectedRole };
      updateUserById(userId, updatedUser)
        .then(() => {
          setUserDetails(updatedUser);
          setDataUpdated(!dataUpdated);
          successMsg(
            `${userDetails.name?.firstName}  ${userDetails.name?.lastName} role updated successfully to ${selectedRole}`
          );
          const userInfo = JSON.parse(
            sessionStorage.getItem("userInfo") as string
          );
          userInfo.role = selectedRole;
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          handleClose();
        })
        .catch((error) => {
          errorMsg(
            `Error updating ${userDetails.name?.firstName}  ${userDetails.name?.lastName} role`
          );
          console.error("Error updating user:", error);
        });
    }
  };

  useEffect(() => {
    getUserByid(userId)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <>
      <motion.i
        className="ms-2 fa-solid fa-file-pen"
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
          <Modal.Title>Edit {userDetails?.name?.firstName} role</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-modal">
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={userDetails?.role}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="business">Buissness</option>
            <option value="admin">Admin</option>
            <option value="non-business">Non-Buissness</option>
          </select>

          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={handleChangeRole}
          >
            Save
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditRoleModal;
