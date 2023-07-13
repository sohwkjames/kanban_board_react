import Page from "../page/Page";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { editTask, getTask, promoteTask } from "../../urls/tasks";
import TextArea from "antd/es/input/TextArea";
import { getPlanByAppAcronym } from "../../urls/plans";

// EditTask page has no promote / demote funciton.
// Only serve to edit task name, task desc, task plan, task notes.
export default function PromoteTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  // const [appAcronym, setAppAcronym ]
  const [form] = useForm();

  useEffect(() => {
    fireGetTask();
    getAvailablePlans();
  }, []);

  async function fireGetTask() {
    const response = await getTask(taskId);
    if (response.success) {
      const task = response.data[0];
      console.log("task,", task);
      form.setFieldsValue({
        taskName: task.Task_name,
        taskDescription: task.Task_description,
        taskPlan: task.Task_plan,
      });
    }
  }

  async function getAvailablePlans() {
    const appAcronym = taskId.split("_")[0];
    const response = await getPlanByAppAcronym(appAcronym);
    if (response.success) {
      let planNameArr = response.data.map((p) => p.Plan_mvp_name);
      setPlans(planNameArr);
    }
    console.log("response", response);
  }

  async function onFinish(vals) {
    console.log("onFInish", vals);
    const appAcronym = taskId.split("_")[0];

    // const editResponse = await editTask(
    //   taskId,
    //   vals.taskName,
    //   vals.taskDescription,
    //   vals.taskPlan
    // );

    const promoteResponse = await promoteTask(
      taskId,
      vals.taskName,
      vals.taskDescription,
      vals.taskPlan
    );
    if (promoteResponse.success) {
      setTimeout(() => {
        toast.success("Task promoted successfully");
      }, 1);

      navigate(`/applications/${appAcronym}`);
    }
  }

  return (
    <Page>
      <h3>Promote Task {taskId}</h3>
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Task Name"
          name="taskName"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Task Description" name="taskDescription">
          <TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>

        <Form.Item label="Task Plan" name="taskPlan">
          <Select
            options={plans.map((planName) => {
              return { label: planName, value: planName };
            })}
          />
        </Form.Item>
        <Space>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              onClick={() => navigate(`/applications/${taskId.split("_")[0]}`)}
            >
              Back to app list
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit and promote task
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <ToastContainer position="bottom-right" />
    </Page>
  );
}
