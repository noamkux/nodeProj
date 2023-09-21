import { FunctionComponent, useContext, useEffect, useState } from "react";
import User from "../interfaces/user";
import {  getAllUsers } from "../services/userServices";
import { getCardsByUserId } from "../services/cardService";
import { SiteTheme } from "../App";
import EditRoleModal from "./EditRoleModal";
import { motion } from "framer-motion";
import DeleteUserModal from "./DeleteUserModal";

interface SandboxProps {
  userInfo: any;
}

const Sandbox: FunctionComponent<SandboxProps> = ({ userInfo }) => {
  let [users, setUsers] = useState<User[]>([]);
  const [postedCards, setPostedCards] = useState<{ [key: number]: number }>({});
  let theme = useContext(SiteTheme);
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [dataUpdated]);

  useEffect(() => {
    users.map((user: User) =>
      getCardsByUserId()
        .then((res) => {
          setPostedCards((prevPostedCards) => ({
            ...prevPostedCards,
            [user._id as number]: res.data.length,
          }));
        })
        .catch((err) => console.log("error"))
    );
  }, [users]);

  return (
    <div className="component-container">
      <div className="mx-5 mb-4 text-center header">
        <h1 className="display-1">Sandbox</h1>
        <p className="display-6 fs-4">
          Here you can edit the users of the website, change premetions and see
          statistics
        </p>
      </div>
      <hr className="hr" />
      <div className="container">
        {users.length ? (
          <div className="table-responsive">
          <table
            className={`${theme === "-dark" ? "table table-dark" : "table"} `}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Card Posted</th>
                <th scope="col">Edit Role</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {user.name?.firstName} {user.name?.lastName}
                  </td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{postedCards[user._id as number]}</td>
                  <td>
                    <EditRoleModal
                      userId={user._id as number}
                      dataUpdated={dataUpdated}
                      setDataUpdated={setDataUpdated}
                    />
                  </td>
                  <td>
                    {userInfo.userId === user._id ? (
                      <>
                        <motion.i
                          className="ms-2 fa-solid fa-trash col-4"
                          title="you can't delete yourself"
                          style={{ cursor: "not-allowed" }}
                          whileHover={{ scale: 1.2 }}
                        ></motion.i>
                      </>
                    ) : (
                      <>

                      <DeleteUserModal
                        userId={user._id as number}
                        dataUpdated={dataUpdated}
                        setDataUpdated={setDataUpdated}/>
                        
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <h2 className="display-3 fs-2 text-center">
            it seems you haven't posted any card yet, click the add a new card
            button to post your business
          </h2>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
