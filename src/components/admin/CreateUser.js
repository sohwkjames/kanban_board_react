import { Form, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
import getAllUserGroups from "../../urls/userGroups";

export default function CreateUser() {
  const [userGroups, setUserGroups] = useState([]);
  const [warning, setWarning] = useState("");
  useEffect(() => {
    async function fireApi() {
      const result = await getAllUserGroups();

      console.log("result is", result);
      if (result.success) {
        const tmp = result.userGroups.map((record) => record.groupname);
        setUserGroups(tmp);
      } else {
        setWarning(result.message);
      }
    }

    fireApi();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="create-user-container">
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          size="medium"
          onFinish={onFinish}
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
                console.log("record", groupname);
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
        </Form>
      </div>
    </div>
  );
}
