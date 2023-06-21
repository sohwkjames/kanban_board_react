import { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";

export default function Admin() {
  const context = useContext(AuthContext);
  console.log("admin context", context);

  useEffect(() => {
    // Should check if userGroup is admin.
  }, []);
  // For non admin users, should block users from acessing.
  return <div>Landing page for admin users</div>;
}
