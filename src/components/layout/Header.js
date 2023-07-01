import { Button } from "antd";
import "./header.css";
import { colourScheme } from "../../utils/colorScheme";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DispatchAuthContext from "../../context/dispatchAuthContext";
import AuthContext from "../../context/authContext";
import { checkUserGroup, getCurrentUserDetails } from "../../urls/auth";
import { useParams } from "react-router-dom";

export default function Header() {
  const dispatch = useContext(DispatchAuthContext);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");
  const location = useLocation();

  // Handles persist 'user management' button when admin user is logged in and user refresh page
  useEffect(() => {
    async function fireGetCurrentUserDetails() {
      const response = await checkUserGroup("admin");
      console.log("header response", response);
      if (response?.success) {
        console.log("Dispatching with isAdmin true");
        dispatch({ type: "setAdmin", payload: { isAdmin: true } });
      } else {
        console.log("Dispatching with isAdmin false");

        dispatch({ type: "setAdmin", payload: { isAdmin: false } });
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
      <h2 onClick={() => navigate("/landing")} style={{ cursor: "pointer" }}>
        Task Management System
      </h2>
      <div className="button-container">
        {context.isAdmin && (
          <div
            className="nav-button"
            onClick={() => navigate("/admin/usermanagement")}
          >
            User Management
          </div>
        )}
        <div
          className={
            "nav-button" + location.pathname === "/profile" ? "-underline" : ""
          }
          onClick={() => navigate("/profile")}
        >
          Profile
        </div>
        <div className="nav-button" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}
