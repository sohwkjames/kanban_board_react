import "./header.css";
import { colourScheme } from "../../utils/colorScheme";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DispatchAuthContext from "../../context/dispatchAuthContext";
import AuthContext from "../../context/authContext";
import { checkUserGroup } from "../../urls/auth";
import { getUser } from "../../urls/users";
import { useSpring, animated } from "react-spring";

export default function Header() {
  const dispatch = useContext(DispatchAuthContext);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");
  const location = useLocation();
  const springs = useSpring({
    from: { x: 0, opacity: 0 },
    to: { x: 50, opacity: 1 },
  });

  // Handles persist 'user management' button when admin user is logged in and user refresh page
  useEffect(() => {
    async function fireGetCurrentUserDetails() {
      const isAdminResponse = await checkUserGroup("admin");
      if (isAdminResponse?.success) {
        dispatch({ type: "setAdmin", payload: { isAdmin: true } });
      } else {
        dispatch({ type: "setAdmin", payload: { isAdmin: false } });
      }

      const isUserResponse = await getUser();
      if (isUserResponse.success) {
        dispatch({
          type: "setUser",
          payload: { ...isUserResponse.data, isAdmin: isAdminResponse.success },
        });
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
      <animated.h2
        onClick={() => navigate("/landing")}
        style={{ cursor: "pointer", ...springs }}
      >
        Task Management System
      </animated.h2>
      {/* <animated.div
        style={{
          width: 80,
          height: 80,
          background: "#ff6d6d",
          borderRadius: 8,
          ...springs,
        }}
      /> */}

      {/* isActive: {context.isActive}
      isAdmin: {context.isAdmin} */}
      <div className="button-container">
        {context.isAdmin ? (
          <div
            className="nav-button"
            onClick={() => navigate("/admin/usermanagement")}
          >
            User Management
          </div>
        ) : (
          <> </>
        )}
        {context.isActive ? (
          <div
            style={{ fontWeight: "bold" }}
            className="nav-button"
            onClick={() => navigate("/applications")}
          >
            App Management
          </div>
        ) : (
          <></>
        )}

        {context.isActive ? (
          <div
            style={{ fontWeight: "bold" }}
            className={
              "nav-button" + location.pathname === "/profile"
                ? "-underline"
                : ""
            }
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>
        ) : (
          <></>
        )}
        <div
          style={{ fontWeight: "bold" }}
          className="nav-button"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
