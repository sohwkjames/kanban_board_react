import { useEffect, useState } from "react";
import "./usergroupwidget.css";
import CreateUserGroups from "./CreateUserGroups";
import { getAllUserGroups } from "../../../urls/userGroups";
import { Card } from "antd";
export default function UserGroupWidget() {
  const [userGroups, setUserGroups] = useState([]);

  // On mount, call api, set state.
  useEffect(() => {
    async function fireApi() {
      const response = await getAllUserGroups();
      if (response.success) {
        // let groupnames = response.userGroups.map((groupname) => groupname);
        setUserGroups(response.userGroups);
      }
    }
    fireApi();
  }, []);

  // on child adding
  function updateData(newGroup) {
    setUserGroups([...userGroups, newGroup]);
  }

  return (
    <div className="usergroup-container">
      <div className="usergroup-list">
        {userGroups.map((group) => {
          return <div>{group}</div>;
        })}
      </div>
      <CreateUserGroups updateParentData={updateData} />
    </div>
  );
}
