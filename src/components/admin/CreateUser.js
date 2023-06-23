import { Form, Input, Button, Select, Space } from "antd";
import { useEffect, useState } from "react";
import getAllUserGroups from "../../urls/userGroups";
import { createNewUser } from "../../urls/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CreateUser(props) {
  const { setCreateUserVisible } = props;
  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
    console.log("Firing createUser useEffect");

    async function fireApi() {
      const result = await getAllUserGroups();

      if (result.success) {
        const tmp = result.userGroups.map((record) => record.groupname);
        setUserGroups(tmp);
      }
    }

    fireApi();
  }, []);

  async function submitForm(values) {
    const result = await createNewUser(
      values.username,
      values.email,
      values.password,
      values.isActive,
      values.userGroup
    );

    if (result.success) {
      toast.success("User created successfully");
      setCreateUserVisible(false);
    } else {
      toast.error(result.message, { theme: "colored" });
    }
  }
  const onFinishFailed = (errorInfo) => {};

  function onCancel() {
    setCreateUserVisible(false);
  }

  return (
    <div className="create-user-container">
      <div>
        <Form
          name="basic"
          size="medium"
          onFinish={submitForm}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Username is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="User Group" name="userGroup">
            <Select>
              {userGroups.map((groupname) => {
                return (
                  <Select.Option value={groupname}>{groupname}</Select.Option>
                );
              })}
              {/* <Select.Option value="1">one</Select.Option>
              <Select.Option value="2">two</Select.Option>
              <Select.Option value="3">Demo</Select.Option> */}
            </Select>
          </Form.Item>

          <Form.Item label="Active" name="isActive">
            <Select>
              <Select.Option value="4">Active</Select.Option>
              <Select.Option value="5">Inactive</Select.Option>
              <Select.Option value="6">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Space>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={onCancel}>Cancel</Button>
            </Form.Item>
          </Space>
        </Form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}
