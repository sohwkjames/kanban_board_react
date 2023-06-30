import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getAllUserGroups } from "../../urls/userGroups";
import { ToastContainer, toast } from "react-toastify";
import { updateUser } from "../../urls/users";
import { useForm } from "antd/es/form/Form";

export default function EditUser(props) {
  console.log("Edituser props", props);
  const { user, handleClose, createToast } = props;
  const [userGroupOptions, setUserGroupOptions] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    async function fireApi() {
      const result = await getAllUserGroups();
      console.log("result is", result);
      if (result.success) {
        const tmp = result.userGroups.map((group) => {
          return { label: group.groupname, value: group.groupname };
        });

        console.log("tmp is", tmp);
        setUserGroupOptions(tmp);
      }
    }

    fireApi();

    const initialValues = user.userGroups.map((group) => {
      // return { label: group, value: group };
      return group;
    });
    form.setFieldValue("selectedUserGroups", initialValues);
  }, []);

  async function onFinish(values) {
    const { username, email, password, isActive, selectedUserGroups } = values;
    console.log("onFinish results", values);
    // const result = await updateUser(
    //   username,
    //   password,
    //   email,
    //   isActive,
    //   userGroup
    // );
    // console.log("result", result);
    // if (result.success) {
    //   createToast(result.message, true);
    //   handleClose();
    // } else {
    //   createToast(result.message, false);
    // }
  }

  return (
    <div>
      <Form
        form={form}
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

        {
          <Form.Item label="User Groups" name="selectedUserGroups">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              options={userGroupOptions}
              // options={[
              //   { label: "a", value: "a" },
              //   { label: "b", value: "b" },
              // ]}
            />
          </Form.Item>
        }
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
