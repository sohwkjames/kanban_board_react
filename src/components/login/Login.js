import { useContext, useReducer, useState } from "react";
import "./login.css";
import { checkUserGroup, login } from "../../urls/auth";
import { Input, Button } from "antd";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import DispatchAuthContext from "../../context/dispatchAuthContext";
import Page from "../page/Page";

export default function Login() {
  const dispatch = useContext(DispatchAuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    const response = await login(username, password);
    if (response.data.success) {
      localStorage.setItem("jwt", response.data.token);

      const isAdminResponse = await checkUserGroup("admin");
      console.log("isAdmin", isAdminResponse);

      // dispatch to context
      dispatch({
        type: "login",
        payload: {
          userGroups: response.data.userGroups,
          username: username,
          isAdmin: isAdminResponse.success,
        },
      });

      setLoading(false);

      navigate(
        response.data.userGroups.includes("admin")
          ? "/admin/usermanagement"
          : "/landing"
      );
    } else {
      setLoading(false);
      setIsError(true);
      setPassword("");
    }
  }

  return (
    <Page>
      <div className="">
        <h1>Login</h1>
        <div className="form">
          <label>Username</label>

          <Input onChange={(e) => setUsername(e.target.value)}></Input>
          <label>Password</label>
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
          ></Input.Password>
        </div>
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        {isError && (
          <p style={{ color: colourScheme.red }}>
            Invalid username or password
          </p>
        )}
      </div>
    </Page>
  );
}
