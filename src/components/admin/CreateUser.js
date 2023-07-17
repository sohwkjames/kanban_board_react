import { Form, Input, Button, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getAllUserGroups } from "../../urls/userGroups";
import { createNewUser } from "../../urls/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "antd/es/form/Form";

export default function CreateUser(props) {
  const { handleClose } = props;
  const [userGroups, setUserGroups] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    async function fireApi() {
      const result = await getAllUserGroups();

      if (result.success) {
        const tmp = result.userGroups.map((groupName) => {
          return { label: groupName, value: groupName };
        });
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
      // handleClose();
      // Clear fields
      form.resetFields();
    } else {
      toast.error(result.message, { theme: "colored" });
    }
  }
  const onFinishFailed = (errorInfo) => {};

  function onCancel() {
    handleClose();
  }

  return (
    <div className="create-user-container">
      <div>
        <h2>Create User</h2>
        <Form
          form={form}
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
            {/* <Select>
              {userGroups.map((groupname) => {
                return (
                  <Select.Option value={groupname}>{groupname}</Select.Option>
                );
              })}
            </Select> */}
            <Select
              mode="tags"
              placeholder="Tags mode"
              style={{ width: "100%" }}
              options={userGroups}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Active"
            name="isActive"
            rules={[
              {
                required: true,
                message: "Please select active status",
              },
            ]}
          >
            <Select>
              <Select.Option value="1">Active</Select.Option>
              <Select.Option value="0">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Space>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={onCancel}>Cancel</Button>
            </Form.Item>
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
          </Space>
        </Form>
        {/* <ToastContainer position="bottom-right" /> */}
      </div>
    </div>
  );
}
