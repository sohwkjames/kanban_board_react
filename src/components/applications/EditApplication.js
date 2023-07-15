import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editApplication,
  getApplication,
  getEarliestEndDate,
  getLatestEndDate,
} from "../../urls/applications";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { getAllUserGroups } from "../../urls/userGroups";
import Page from "../page/Page";

export default function EditApplication(props) {
  const [latestEndDate, setLatestEndDate] = useState();
  const [appEndDate, setAppEndDate] = useState();
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const { appAcronym } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    fireApis();
    populateUserGroups();

    form.setFieldValue("appAcronym", appAcronym);
    form.setFieldValue("appEndDate", dayjs(appEndDate));
  }, []);

  async function fireApis() {
    const appDataResponse = await getApplication(appAcronym);
    if (appDataResponse.success) {
      setAppEndDate(appDataResponse.data[0].App_enddate);
    }

    const latestEndDateResponse = await getLatestEndDate(appAcronym);
    console.log("latestEndDateResponse", latestEndDateResponse);
    if (latestEndDateResponse.success) {
      setLatestEndDate(latestEndDateResponse.data);
    }
  }

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
    const vals = {
      ...values,
      appEnddate: values.appEnddate.format("YYYY-MM-DD"),
    };

    const response = await editApplication(
      vals.appAcronym,
      vals.appDescription,
      vals.appEnddate,
      vals.appPermitCreate,
      vals.appPermitOpen,
      vals.appPermitTodolist,
      vals.appPermitDoing,
      vals.appPermitDone
    );

    if (response.success) {
      navigate("/applications");
      setTimeout(() => {
        toast.success("App edited successfully");
      }, 1);
    }
    if (!response.success) {
      toast.error(response.message);
    }
  }

  // Disable dates that are later than the earliest plan end date.
  const disabledDate = (current) => {
    // returning true disables a date
    if (latestEndDate && current < dayjs(latestEndDate)) {
      return true;
    }
    // disable days before today
    if (current < dayjs().endOf("day")) {
      return true;
    }
    return false;
  };

  return (
    <Page>
      <div>
        <h2>Edit App {appAcronym}</h2>
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
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
            name="appEnddate"
            rules={[{ required: true, message: "App end date is required" }]}
          >
            <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
          </Form.Item>
          <h3>Configure which actions can be performed by which user group</h3>

          <Form.Item label="Creating a task " name="appPermitCreate">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userGroups.map((groupName) => {
                return { value: groupName, label: groupName };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Send task from open to to-do, and create plans"
            name="appPermitOpen"
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userGroups.map((groupName) => {
                return { value: groupName, label: groupName };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Send task from doing to done."
            name="appPermitDoing"
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userGroups.map((groupName) => {
                return { value: groupName, label: groupName };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Send task from done to doing, or send task from done to closed"
            name="appPermitDone"
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userGroups.map((groupName) => {
                return { value: groupName, label: groupName };
              })}
            />
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
          <ToastContainer position="bottom-right" theme="colored" />
        </Form>
      </div>
    </Page>
  );
}
