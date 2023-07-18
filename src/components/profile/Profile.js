import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { getUser, updateUserProfile } from "../../urls/users";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import Spinner from "../layout/Spinner";
import Page from "../page/Page";
import { colourScheme } from "../../utils/colorScheme";
import { useNavigate } from "react-router-dom";
import { getMyUserGroups } from "../../urls/userGroups";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

export default function Profile() {
  const [form] = useForm();
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showErr, setShowErr] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // hit the get user details api
    fireApi();
    fireGetMyUserGroups();
  }, []);

  async function fireApi() {
    const result = await getUser();
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

  async function fireGetMyUserGroups() {
    const result = await getMyUserGroups();
    console.log("james", result);
    setUserGroups(result.data);
    form.setFieldValue("userGroup", result.data);
  }

  async function onFinish(values) {
    // Hit the update api
    const { email, password } = values;
    const result = await updateUserProfile(email, password);
    if (result.success) {
      toast.success("User updated successfully");
    } else {
      toast.error(result.message);
    }
  }

  function handleClose() {
    navigate("/landing");
  }

  if (showWarning) {
    return UnverifiedUser("You are not allowed to view this resource.");
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Page>
      <Form
        // {...layout}
        form={form}
        name="editUser"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Username" name="username">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="New Password" name="password">
          <Input.Password placeholder="Leave blank to not update password" />
        </Form.Item>
        <Form.Item label="Active" name="isActive">
          <Select disabled={true}>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="User Group" name="userGroup">
          <Select
            mode="multiple"
            disabled
            style={{
              width: "100%",
            }}
            defaultValue={userGroups}
          />
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
        {/* <ToastContainer position="bottom-right" /> */}
      </Form>
      {showErr && (
        <p style={{ color: colourScheme.red }}>Invalid username or password</p>
      )}
    </Page>
  );
}
