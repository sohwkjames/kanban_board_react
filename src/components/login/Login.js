import { useContext, useReducer, useState } from "react";
import "./login.css";
import { login } from "../../urls/auth";
import { Input, Button } from "antd";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import DispatchAuthContext from "../../context/dispatchAuthContext";

export default function Login() {
  const dispatch = useContext(DispatchAuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    const response = await login(username, password);
    if (response.data.success) {
      localStorage.setItem("jwt", response.data.token);

      // dispatch to context
      dispatch({
        type: "login",
        payload: { userGroup: response.data.userGroup },
      });

      navigate(response.data.userGroup === "admin" ? "/admin" : "/landing");
    } else {
      setIsError(true);
      setPassword("");
    }
  }

  return (
    <div className="">
      <h1>Login</h1>
      <div className="">
        <label>Username</label>

        <Input onChange={(e) => setUsername(e.target.value)}></Input>
        <label>Password</label>
        <Input onChange={(e) => setPassword(e.target.value)}></Input>
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
      {isError && (
        <p style={{ color: colourScheme.red }}>Invalid username or password</p>
      )}
    </div>
  );
}
