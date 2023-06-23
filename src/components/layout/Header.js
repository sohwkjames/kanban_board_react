import { Button } from "antd";
import "./header.css";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DispatchAuthContext from "../../context/dispatchAuthContext";
import AuthContext from "../../context/authContext";
import { checkUserGroup, getCurrentUserDetails } from "../../urls/auth";

export default function Header() {
  const dispatch = useContext(DispatchAuthContext);
  const context = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fireGetCurrentUserDetails() {
      const result = await getCurrentUserDetails();
      if (result?.success) {
        dispatch({ type: "setUser", payload: result.data });
      }
    }

    fireGetCurrentUserDetails();
  }, []);

  function handleLogout() {
    localStorage.removeItem("jwt");
    dispatch({ type: "logout" });
    navigate("/");
  }

  return (
    <div style={{ background: colourScheme.lightBlue }} className="container">
      <div>Task Management System</div>
      <div className="button-container">
        {context.userGroup === "admin" && (
          <Button onClick={() => navigate("/admin/usermanagement")}>
            User Management
          </Button>
        )}
        <Button>Button 2</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {/* {context.username ? "Hi " + context.username : ""} */}
    </div>
  );
}
