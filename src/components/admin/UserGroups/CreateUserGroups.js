import { Button, Input } from "antd";
import "./createusergroup.css";
import { useState } from "react";
import { addUserGroup } from "../../../urls/userGroups";
import { ToastContainer, toast } from "react-toastify";

export default function CreateUserGroups({ setUserGroups, updateParentData }) {
  const [groupName, setGroupName] = useState("");

  async function handleAddGroup() {
    const response = await addUserGroup(groupName);
    console.log("james response is", response);
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
      <Input onChange={(e) => setGroupName(e.target.value)}></Input>
      <Button onClick={handleAddGroup}>Add group</Button>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}
