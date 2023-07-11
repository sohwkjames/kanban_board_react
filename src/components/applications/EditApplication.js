import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApplication,
  getEarliestEndDate,
  getLatestEndDate,
} from "../../urls/applications";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

export default function EditApplication(props) {
  const [latestEndDate, setLatestEndDate] = useState();
  const [appEndDate, setAppEndDate] = useState();
  const { appAcronym } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    fireApis();

    form.setFieldValue("appAcronym", appAcronym);
    form.setFieldValue("appEndDate", dayjs(appEndDate));
  }, []);

  async function fireApis() {
    const appDataResponse = await getApplication(appAcronym);
    if (appDataResponse.success) {
      setAppEndDate(appDataResponse.data[0].App_enddate);
    }

    const latestEndDateResponse = await getLatestEndDate(appAcronym);

    if (latestEndDateResponse.success) {
      setLatestEndDate(latestEndDateResponse.data);
    }
  }

  async function onFinish(vals) {
    console.log("onFInish vals", vals);
  }

  // Only enable days that is later than the plan with the furthest away end date.
  const disabledDate = (current) => {
    // Disable days
    if (current < dayjs(latestEndDate)) {
      return true;
    }
    // disable days before today
    if (current < dayjs().endOf("day")) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div>
        <h2>Edit App {appAcronym}</h2>
        <Form
          form={form}
          name="editAplication"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="App Acronym"
            name="appAcronym"
            disabled={true}
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input disabled={true} />
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
            label="App end date"
            name="appEndDate"
            rules={[{ required: true, message: "App end date is required" }]}
          >
            <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
          </Form.Item>

          <Space>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button onClick={() => navigate("/applications")}>
                Back to app list
              </Button>
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
    </div>
  );
}
