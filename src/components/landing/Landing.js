import { useContext } from "react";
import AuthContext from "../../context/authContext";
import Page from "../page/Page";

export default function Landing() {
  const context = useContext(AuthContext);
  console.log("landing context", context);

  return (
    <Page>
      <div>Welcome to the Task Management System!</div>
    </Page>
  );
}
