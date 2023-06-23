import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import getAllUserGroups from "../../urls/userGroups";
import { ToastContainer, toast } from "react-toastify";
import updateUser from "../../urls/users";

export default function EditUser(props) {
  const { user, handleClose, createToast } = props;

  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
    console.log("Firing editUser useEffect");

    async function fireApi() {
      const result = await getAllUserGroups();

      if (result.success) {
        const tmp = result.userGroups.map((record) => record.groupname);
        setUserGroups(tmp);
      }
    }

    fireApi();
  }, []);

  async function onFinish({ username, email, password, isActive, userGroup }) {
    const result = await updateUser(
      username,
      password,
      email,
      isActive,
      userGroup
    );
    console.log("result", result);
    if (result.success) {
      createToast(result.message, true);
      handleClose();
    } else {
      createToast(result.message, false);
    }
  }

  return (
    <div>
      This is Edit User
      <div>Selected user is: {user.username}</div>
      <Form
        name="editUser"
        initialValues={{
          username: user.username,
          email: user.email,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input disabled={true} />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="User Group" name="userGroup">
          <Select disabled={user.username === "admin"}>
            {userGroups.map((groupname) => {
              return (
                <Select.Option value={groupname}>{groupname}</Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Active" name="isActive">
          <Select disabled={user.username === "admin"}>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Space>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>
        <ToastContainer position="bottom-right" />
      </Form>
    </div>
  );
}
