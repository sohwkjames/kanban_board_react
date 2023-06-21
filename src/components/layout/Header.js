import { Button } from "antd";
import "./header.css";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DispatchAuthContext from "../../context/dispatchAuthContext";

export default function Header() {
  const dispatch = useContext(DispatchAuthContext);
  const navigate = useNavigate();
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
    </div>
  );
}
