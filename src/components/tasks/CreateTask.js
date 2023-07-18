import { Button, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { checkUserGroup } from "../../urls/auth";
import { addTask, checkUserCanPerformAction } from "../../urls/tasks";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanByAppAcronym } from "../../urls/plans";
import Spinner from "../layout/Spinner";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import Page from "../page/Page";
import TextArea from "antd/es/input/TextArea";
import { TASK_STATES } from "../../constants/taskState";
import { toast } from "react-toastify";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

// Only project lead can access this component
export default function CreateTask() {
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const { appAcronym } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckUserGroup();
    getPlans();
  }, []);

  async function handleCheckUserGroup() {
    const response = await checkUserCanPerformAction(
      appAcronym,
      "App_permit_create"
    );
    if (response.success) {
      setLoading(false);
      setUnauthorized(false);
    } else {
      setLoading(false);
      setUnauthorized(true);
    }
  }

  async function getPlans() {
    const response = await getPlanByAppAcronym(appAcronym);

    if (response.success) {
      const tmpArr = response.data.map((plan) => {
        return { label: plan.Plan_mvp_name, value: plan.Plan_mvp_name };
      });
      setPlans(tmpArr);
    }
  }

  async function onFinish(values) {
    const result = await addTask(
      values.taskName,
      values.taskDescription,
      values.taskPlan,
      appAcronym,
      values.notes
    );
    if (result.success) {
      setTimeout(() => {
        toast.success("Task added successfully");
      }, 1);

      navigate(`/applications/${appAcronym}`);
    } else {
      if (result.message) toast.error(result.message);
      else toast.error("Error creating task");
    }
  }

  if (loading) return <Spinner />;

  if (unauthorized)
    return (
      <UnverifiedUser message="You do not have permission to access this resource" />
    );

  return (
    <Page>
      <h3>Create Task</h3>
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
          name="taskAppAcronym"
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

        <Form.Item label="Task name" name="taskName">
          <Input />
        </Form.Item>

        <Form.Item label="Plan" name="taskPlan">
          <Select style={{ width: "100%" }} options={plans}></Select>
        </Form.Item>

        <Form.Item label="Description" name="taskDescription">
          <TextArea />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea />
        </Form.Item>

        {/* <Form.List name="notes">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "notes" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Input
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Note
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List> */}

        <Space>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button>Cancel</Button>
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
        </Space>
      </Form>
    </Page>
  );
}
