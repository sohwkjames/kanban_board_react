import { Button, DatePicker, Form, Input, ColorPicker, theme } from "antd";
import dayjs from "dayjs";
import Page from "../page/Page";
import TextArea from "antd/es/input/TextArea";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplication } from "../../urls/applications";
import { createPlan } from "../../urls/plans";
import { checkProtectedRouteAccess } from "../../urls/auth";
import { checkUserCanPerformAction } from "../../urls/tasks";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import Spinner from "../layout/Spinner";
import { useForm } from "antd/es/form/Form";

export default function CreatePlan() {
  const { token } = theme.useToken();

  useEffect(() => {
    getAppDetails();
    checkRoute();
    form.setFieldValue("planColour", token.colorPrimary);
  }, []);

  const [appStartDate, setAppStartDate] = useState([]);
  const [appEndDate, setAppEndDate] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = useForm();

  const { appAcronym } = useParams();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;

  async function getAppDetails() {
    const result = await getApplication(appAcronym);
    setAppStartDate(result.data[0].App_startdate);
    setAppEndDate(result.data[0].App_enddate);
  }

  async function checkRoute() {
    // App_permit_open is the "project manager" role.
    const result = await checkUserCanPerformAction(
      appAcronym,
      "App_permit_open"
    );
    if (result.success) {
      setUnauthorized(false);
    } else {
      setUnauthorized(true);
    }
    setIsLoading(false);
  }

  async function onFinish(values) {
    console.log("planValues", values);
    const formattedPlanColour =
      typeof values.planColour === "string"
        ? values.planColour
        : values.planColour.toHexString();

    const formattedValues = {
      ...values,
      planColour: formattedPlanColour,
      planStartDate: values.planDates[0].format("YYYY-MM-DD"),
      planEndDate: values.planDates[1].format("YYYY-MM-DD"),
    };
    console.log(formattedValues);
    const createPlanResponse = await createPlan(
      formattedValues.planMvpName,
      formattedValues.planAppAcronym,
      formattedValues.planStartDate,
      formattedValues.planEndDate,
      appAcronym,
      formattedValues.planColour
    );

    if (createPlanResponse.success) {
      setTimeout(() => {
        toast.success("Plan added successfully");
      }, 1);

      navigate(`/applications/${appAcronym}`);
    } else {
      toast.error(createPlanResponse.message);
    }
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    if (current < dayjs(appStartDate)) {
      return true;
    }
    if (current > dayjs(appEndDate)) {
      return true;
    }
    return false;
  };

  // const disabledEndDate = (current) => {
  //   if (current < dayjs(appStartDate)) {
  //     return true;
  //   }
  //   if (current > dayjs(appEndDate)) {
  //     return true;
  //   }
  //   return false;
  // };

  if (isLoading) {
    return <Spinner />;
  }

  if (unauthorized) {
    return (
      <UnverifiedUser message="You do not have permission to access this resource" />
    );
  }

  return (
    <Page>
      <h3>Create Plan</h3>
      <Form
        form={form}
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
          initialValue={appAcronym}
          rules={[
            {
              required: true,
              message: "App acronym is required",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="Plan MVP name"
          name="planMvpName"
          rules={[
            {
              required: true,
              message: "Plan MVP name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Plan Date"
          name="planDates"
          rules={[
            {
              required: true,
              message: "Plan Start Date is required",
            },
          ]}
        >
          <RangePicker
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
          ></RangePicker>
        </Form.Item>

        <Form.Item
          label="Plan Colour"
          style={{
            maxWidth: 600,
          }}
          name="planColour"
        >
          <ColorPicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button onClick={() => navigate(`/applications/${appAcronym}`)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <ToastContainer position="bottom-right" theme="colored" /> */}
    </Page>
  );
}
