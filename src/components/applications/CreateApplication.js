import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { createApplication } from "../../urls/applications";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { getAllUserGroups } from "../../urls/userGroups";

const dateFormat = "YYYY/MM/DD";

export default function CreateApplication(props) {
  const [userGroups, setUserGroups] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Firing CreateApplication useEffect");
    populateUserGroups();
  }, []);

  const { RangePicker } = DatePicker;

  async function populateUserGroups() {
    try {
      const result = await getAllUserGroups();
      setUserGroups(result.data);
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
      vals.appEnddate
    );
    if (result.success) {
      toast.success("App added successfully");
    }
    if (!result.success) {
      toast.error(result.message);
    }
  }

  return (
    <div>
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

        {/* <Form.Item
          label="App End Date"
          name="appEndDate"
          rules={[
            {
              required: true,
              message: "App end date is required",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
 */}
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
    </div>
  );
}
