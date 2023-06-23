import { useEffect, useState } from "react";
import { getUserList } from "../../urls/auth";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import UserList from "./UserList";
import { Button } from "antd";
import "./admin.css";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { ToastContainer, toast } from "react-toastify";

export default function Admin() {
  const [showWarning, setShowWarning] = useState();
  const [warningMessage, setWarningMessage] = useState();
  const [users, setUsers] = useState([]);
  const [createUserVisible, setCreateUserVisible] = useState(false);
  const [editUserVisible, setEditUserVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    console.log("Firing Admin useEffect");

    async function getUsersOnRender() {
      const response = await getUserList();
      console.log("Result", response);
      if (response.success) {
        const dataWithKey = response.data.map((user) => {
          return {
            ...user,
            key: user.username,
          };
        });

        setUsers(dataWithKey);
      } else {
        setShowWarning(true);
        setWarningMessage(response.message);
      }
    }

    getUsersOnRender();
  }, [userListVisible]);

  function handleClose() {
    console.log("fire handleclose");
    setCreateUserVisible(false);
    setEditUserVisible(false);
    setUserListVisible(true);
  }

  function handleSelectUser(user) {
    setSelectedUser(user);
    setEditUserVisible(true);
    setCreateUserVisible(false);
    setUserListVisible(false);
  }

  function createToast(message, success) {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  // For non admin users, should block users from acessing.
  if (showWarning) {
    return (
      <div>
        <UnverifiedUser message={warningMessage} />
      </div>
    );
  }
  return (
    <div>
      {userListVisible && (
        <div>
          <div className="info-container">
            <h3>User Overview</h3>
            <Button
              onClick={() => {
                setUserListVisible(false);
                setCreateUserVisible(true);
              }}
              type="primary"
              size="large"
            >
              Create User
            </Button>
          </div>
          <UserList users={users} handleSelectUser={handleSelectUser} />
        </div>
      )}
      {createUserVisible && <CreateUser handleClose={handleClose} />}

      {editUserVisible && (
        <EditUser
          user={selectedUser}
          handleClose={handleClose}
          createToast={createToast}
        />
      )}
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}
