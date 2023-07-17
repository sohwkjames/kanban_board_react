import { Button, Input } from "antd";
import "./createusergroup.css";
import { useState } from "react";
import { addUserGroup } from "../../../urls/userGroups";
import { ToastContainer, toast } from "react-toastify";

export default function CreateUserGroups({ setUserGroups, updateParentData }) {
  const [groupName, setGroupName] = useState("");

  async function handleAddGroup() {
    if (!groupName.length) {
      toast.error("Group name cannot be empty");
      return;
    }
    const response = await addUserGroup(groupName);
    if (response.success) {
      toast.success(response.message);
      updateParentData(groupName);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="createusergroups-container">
      {/* <input></input> */}
      <p>Create User Group</p>
      <Input onChange={(e) => setGroupName(e.target.value)}></Input>
      <Button onClick={handleAddGroup}>Add group</Button>
      {/* <ToastContainer position="bottom-right" theme="colored" /> */}
    </div>
  );
}
