import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import { Button, Form, Input, Select, Space } from "antd";
import { ToastContainer } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { getUser } from "../../urls/users";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import Spinner from "../layout/Spinner";
import Page from "../page/Page";
import { colourScheme } from "../../utils/colorScheme";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};

export default function Profile() {
  const [form] = useForm();
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    // hit the get user details api
    async function fireApi() {
      const result = await getUser();
      console.log("Result is", result);
      if (result.success) {
        form.setFieldsValue({
          username: result.data.username,
          email: result.data.email,
          isActive: result.data.isActive ? "Active" : "Not active",
        });

        setLoading(false);
      } else {
        setShowWarning(true);
      }
    }

    fireApi();
  }, []);

  function onFinish(values) {
    // Hit the update api

    console.log("finish, values", values);
  }

  function handleClose() {
    console.log("Closing");
  }

  if (showWarning) {
    return UnverifiedUser("You are not allowd to view this resource.");
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Page>
      <Form
        {...layout}
        form={form}
        name="editUser"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Username" name="username">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {},
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item label="User Group" name="userGroup">
          <Select disabled={user.username === "admin"}>
            {userGroups.map((groupname) => {
              return (
                <Select.Option value={groupname}>{groupname}</Select.Option>
              );
            })}
          </Select>
        </Form.Item> */}

        <Form.Item label="Active" name="isActive">
          <Select disabled={true}>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Space align="center">
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
      {showErr && (
        <p style={{ color: colourScheme.red }}>Invalid username or password</p>
      )}
    </Page>
  );
}
