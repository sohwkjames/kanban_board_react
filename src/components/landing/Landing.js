import { useContext } from "react";
import AuthContext from "../../context/authContext";
import Page from "../page/Page";
import Applications from "../applications/Applications";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Page>
      <h3>Welcome {context.username}</h3>
      {/* <div>Welcome to the Task Management System!</div> */}
      {/* <h3>Proceed to login</h3> */}
      <div onClick={() => navigate("/applications")}>
        Go to application list
      </div>
    </Page>
  );
}
