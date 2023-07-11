import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { createApplication } from "../../urls/applications";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { getAllUserGroups } from "../../urls/userGroups";
import Spinner from "../layout/Spinner";
import Page from "../page/Page";
import { checkUserCanPerformAction } from "../../urls/tasks";
import { checkUserGroup } from "../../urls/auth";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";

const dateFormat = "YYYY/MM/DD";

export default function CreateApplication(props) {
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Firing CreateApplication useEffect");
    populateUserGroups();
    checkRoute();
  }, []);

  const { RangePicker } = DatePicker;

  async function populateUserGroups() {
    try {
      const result = await getAllUserGroups();
      setUserGroups(result.userGroups);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function checkRoute() {
    const result = await checkUserGroup("projectLead");
    console.log("checkROute result", result);
    if (result.success) {
      setUnauthorized(false);
    } else {
      setUnauthorized(true);
    }
    setLoading(false);
  }

  async function onFinish(values) {
    console.log("on finish values");
    // const appStartdate = values.appStartdate;
    const vals = {
      ...values,
      appStartdate: values.appDate[0].format("YYYY-MM-DD"),
      appEnddate: values.appDate[1].format("YYYY-MM-DD"),
    };
    console.log(vals);
    const result = await createApplication(
      vals.appAcronym,
      vals.appRnumber,
      vals.appDescription,
      vals.appStartdate,
      vals.appEnddate,
      vals.appPermitOpen,
      vals.appPermitTodolist,
      vals.appPermitDoing,
      vals.appPermitDone
    );
    if (result.success) {
      navigate("/applications");
      setTimeout(() => {
        toast.success("App added successfully");
      }, 1);
    }
    if (!result.success) {
      toast.error(result.message);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (unauthorized) {
    return (
      <UnverifiedUser message="You do not have permission to access this resource" />
    );
  }

  return (
    <Page>
      <h3>Create Application</h3>
      <Form
        layout="vertical"
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
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="App Acronym"
          name="appAcronym"
          rules={[
            {
              required: true,
              message: "App acronym is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="App Description" name="appDescription">
          <TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>

        <Form.Item
          label="App Running Number"
          name="appRnumber"
          rules={[
            {
              required: true,
              message: "App running number is required",
            },
          ]}
        >
          <InputNumber precision={0} min={0} />
        </Form.Item>

        <Form.Item
          label="App Start Date"
          name="appDate"
          rules={[
            {
              required: true,
              message: "App Date is required",
            },
          ]}
        >
          <RangePicker format="YYYY-MM-DD" />
        </Form.Item>

        <h3>
          For each task state, which user group can take actions on the task?
        </h3>

        <Form.Item label="Creating a task" name="appPermitCreate">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item>

        <Form.Item label="Send task from open to to-do" name="appPermitOpen">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Send task from to-do to doing, and from doing to to-do."
          name="appPermitTodolist"
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item>

        <Form.Item label="Send task from doing to done." name="appPermitDoing">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Send task from done to approved, or send task from done to closed"
          name="appPermitDone"
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer position="bottom-right" theme="colored" />
    </Page>
  );
}
