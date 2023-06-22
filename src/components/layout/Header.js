import { Button } from "antd";
import "./header.css";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import DispatchAuthContext from "../../context/dispatchAuthContext";
import AuthContext from "../../context/authContext";
import { checkUserGroup, getCurrentUserDetails } from "../../urls/auth";

export default function Header() {
  const dispatch = useContext(DispatchAuthContext);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function setUserDetails() {
  //     const result = await getCurrentUserDetails();
  //     if (result.success) {
  //       dispatch({ type: "setUser", payload: result.userDetails });
  //     }
  //   }
  // }, []);

  function handleLogout() {
    localStorage.removeItem("jwt");
    dispatch({ type: "logout" });
    navigate("/");
  }

  return (
    <div style={{ background: colourScheme.lightBlue }} className="container">
      <div>Task Management System</div>
      <div className="button-container">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {/* {context.username ? "Hi " + context.username : ""} */}
    </div>
  );
}
