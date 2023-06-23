import { useContext } from "react";
import AuthContext from "../../context/authContext";

export default function Landing() {
  const context = useContext(AuthContext);
  console.log("landing context", context);
  return <div>Landing page for both admin and non admin users.</div>;
}
