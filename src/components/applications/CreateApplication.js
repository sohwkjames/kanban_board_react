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

const dateFormat = "YYYY/MM/DD";

export default function CreateApplication(props) {
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Firing CreateApplication useEffect");
    populateUserGroups();
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

  async function onFinish(values) {
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
      toast.success("App added successfully");
      navigate("/applications");
    }
    if (!result.success) {
      toast.error(result.message);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Page>
      <h3>Create Application</h3>
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

        <h3>Configure user group permissions to task's current state</h3>

        <Form.Item label="When task is open" name="appPermitOpen">
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

        <Form.Item label="When task is in to-do list" name="appPermitTodolist">
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

        <Form.Item label="When task is doing" name="appPermitDoing">
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

        <Form.Item label="When task is done" name="appPermitDone">
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
