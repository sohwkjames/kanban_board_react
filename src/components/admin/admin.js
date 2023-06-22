import { useEffect, useState } from "react";
import { getUserList } from "../../urls/auth";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import UserList from "./UserList";
import { Button } from "antd";
import "./admin.css";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [showWarning, setShowWarning] = useState();
  const [warningMessage, setWarningMessage] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsersOnRender() {
      const response = await getUserList();
      console.log("Result", response);
      if (response.success) {
        setUsers(response.data);
      } else {
        setShowWarning(true);
        setWarningMessage(response.message);
      }
    }

    getUsersOnRender();

    // async function checkIsAdmin() {
    //   const result = await checkUserGroup("admin");
    //   if (result.success) {
    //     setShowWarning(false);

    //   } else {
    //     setShowWarning(true);
    //     setWarningMessage(result.message);
    //   }
    //   // return result;
    // }

    // checkIsAdmin();
  }, []);

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
      <div className="info-container">
        <h3>User Overview</h3>
        <Button
          onClick={() => navigate("/admin/create")}
          type="primary"
          size="large"
        >
          Create User
        </Button>
      </div>
      <UserList users={users} />
    </div>
  );
}
