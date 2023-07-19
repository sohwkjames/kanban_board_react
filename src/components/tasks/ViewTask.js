import Page from "../page/Page";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { editTask, getTask } from "../../urls/tasks";
import TextArea from "antd/es/input/TextArea";
import { getPlanByAppAcronym } from "../../urls/plans";
import NoteBox from "./NoteBox";

// EditTask page has no promote / demote funciton.
// Only serve to edit task name, task desc, task plan, task notes.
export default function ViewTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentTask, setCurrentTask] = useState();

  // const [appAcronym, setAppAcronym ]
  const [form] = useForm();

  useEffect(() => {
    fireGetTask();
    getAvailablePlans();
  }, []);

  async function fireGetTask() {
    const response = await getTask(taskId);
    if (response.success) {
      console.log("response", response);
      const task = response.data[0];

      setCurrentTask(task);
      console.log("task", task);

      form.setFieldsValue({
        taskName: task.Task_name,
        taskDescription: task.Task_description,
        taskPlan: task.Task_plan,
      });
      if (task.Task_notes) {
        setNotes(task.Task_notes);
      }
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

    const response = await editTask(
      taskId,
      vals.taskName,
      vals.taskDescription,
      vals.taskPlan,
      vals.taskNote
    );
    if (response.success) {
      setTimeout(() => {
        toast.success("Task edited successfully");
      }, 1);

      navigate(`/applications/${appAcronym}`);
    }
  }

  return (
    <Page>
      <h3>View Task {taskId}</h3>
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Task Name"
          name="taskName"

          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Task Description" name="taskDescription">
          <TextArea
            disabled
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>
        <Form.Item label="Task Plan" name="taskPlan">
          <Select
            disabled
            options={plans.map((planName) => {
              return { label: planName, value: planName };
            })}
          />
        </Form.Item>
        {/* <Form.Item label="Task Note" name="taskNote">
          <TextArea
            disabled
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item> */}

        <div style={{}}>
          {currentTask && <div>Task creator: {currentTask.Task_creator}</div>}
          {currentTask && <div>Task owner: {currentTask.Task_owner}</div>}
          <h3>Notes</h3>
          <div
            style={{ paddingBottom: "3em", overflow: "auto", height: "200px" }}
          >
            {notes.toReversed().map((note) => (
              <NoteBox note={note} key={note} />
              // <div>{note.note}</div>
            ))}
          </div>
        </div>
        <Space>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              onClick={() => navigate(`/applications/${taskId.split("_")[0]}`)}
            >
              Back to app list
            </Button>
          </Form.Item>
        </Space>
      </Form>
      {/* <ToastContainer position="bottom-right" /> */}
    </Page>
  );
}
