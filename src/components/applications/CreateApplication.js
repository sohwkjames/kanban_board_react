import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { createApplication } from "../../urls/applications";

export default function CreateApplication(props) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Firing CreateApplication useEffect");
  }, []);

  const { RangePicker } = DatePicker;

  async function onFinish(values) {
    // const appStartdate = values.appStartdate;
    const vals = {
      ...values,
      appStartdate: values.appDate[0].$d,
      appEnddate: values.appDate[1].$d,
    };
    console.log(vals);
    const result = await createApplication(
      vals.appAcronym,
      vals.appRnumber,
      vals.appStartdate,
      vals.appEnddate
    );

    console.log("result", result);
    // console.log(values.appStartdate[0].$d);
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
          <RangePicker />
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
    </div>
  );
}
