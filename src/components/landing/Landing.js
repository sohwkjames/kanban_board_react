import { useContext } from "react";
import AuthContext from "../../context/authContext";
import Page from "../page/Page";

export default function Landing() {
  const context = useContext(AuthContext);
  console.log("landing context", context);

  return (
    <Page>
      <div>Landing page for both admin and non admin users.</div>
    </Page>
  );
}
