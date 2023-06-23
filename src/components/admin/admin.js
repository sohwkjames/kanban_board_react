import { useEffect, useState } from "react";
import { getUserList } from "../../urls/auth";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import UserList from "./UserList";
import { Button } from "antd";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";

export default function Admin() {
  const [showWarning, setShowWarning] = useState();
  const [warningMessage, setWarningMessage] = useState();
  const [users, setUsers] = useState([]);
  const [createUserVisible, setCreateUserVisible] = useState(false);
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
  }, [createUserVisible]);

  if (showWarning) {
    return (
      <div>
        <UnverifiedUser message={warningMessage} />
      </div>
    );
  }
  // For non admin users, should block users from acessing.
  return (
    <div>
      {!createUserVisible && (
        <div>
          <div className="info-container">
            <h3>User Overview</h3>
            <Button
              onClick={() => setCreateUserVisible(true)}
              type="primary"
              size="large"
            >
              Create User
            </Button>
          </div>
          <UserList users={users} />
        </div>
      )}
      {createUserVisible && (
        <CreateUser setCreateUserVisible={setCreateUserVisible} />
      )}
    </div>
  );
}
