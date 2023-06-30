import { Button } from "antd";
import "./header.css";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DispatchAuthContext from "../../context/dispatchAuthContext";
import AuthContext from "../../context/authContext";
import { checkUserGroup, getCurrentUserDetails } from "../../urls/auth";
import { useParams } from "react-router-dom";

export default function Header() {
  const dispatch = useContext(DispatchAuthContext);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

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
          <Button
            type="primary"
            onClick={() => navigate("/admin/usermanagement")}
          >
            User Management
          </Button>
        )}
        <Button type="primary" onClick={() => navigate("/profile/manage")}>
          Profile
        </Button>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
