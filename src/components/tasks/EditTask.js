import Page from "../page/Page";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { checkUserCanPerformAction, editTask, getTask } from "../../urls/tasks";
import TextArea from "antd/es/input/TextArea";
import { getPlanByAppAcronym } from "../../urls/plans";
import NoteBox from "./NoteBox";
import { ACTION_PERMISSION_COLUMNS } from "../../constants/taskState";
import Spinner from "../layout/Spinner";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";

// EditTask page has no promote / demote funciton.
// Only serve to edit task name, task desc, task plan, task notes.
export default function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentTask, setCurrentTask] = useState();
  const [editPlanDisabled, setEditPlanDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const [form] = useForm();

  useEffect(() => {
    getTaskAndCheckPermissions();
    getAvailablePlans();
  }, []);

  async function getTaskAndCheckPermissions() {
    const response = await getTask(taskId);
    if (response.success) {
      console.log("response", response);
      const task = response.data[0];

      const appAcronym = task.Task_app_acronym;
      const taskState = task.Task_state;
      const actionName = ACTION_PERMISSION_COLUMNS[taskState];
      setCurrentTask(task);
      console.log("task", task);
      if (taskState !== "open") {
        setEditPlanDisabled(true);
      } else {
        setEditPlanDisabled(false);
      }

      const permissionResponse = await checkUserCanPerformAction(
        appAcronym,
        actionName
      );

      if (!permissionResponse.success) {
        setUnauthorized(true);
      }

      form.setFieldsValue({
        taskName: task.Task_name,
        taskDescription: task.Task_description,
        taskPlan: task.Task_plan,
      });
      if (task.Task_notes) {
        setNotes(task.Task_notes);
      }
    }
    setLoading(false);
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
    } else {
      toast.error(
        response?.message ? response.message : "Failed to update task"
      );
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (unauthorized) {
    return (
      <UnverifiedUser message="You are not allowed to access this resource" />
    );
  }

  return (
    <Page>
      <h3>Edit Task {taskId}</h3>
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
            disabled={editPlanDisabled}
            options={plans.map((planName) => {
              return { label: planName, value: planName };
            })}
          />
        </Form.Item>
        <Form.Item label="Task Note" name="taskNote">
          <TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>

        <div>
          {currentTask && <div>Task creator: {currentTask.Task_creator}</div>}
          {currentTask && <div>Task owner: {currentTask.Task_owner}</div>}
          <h3>Notes</h3>
          <div
            style={{ paddingBottom: "3em", overflow: "auto", height: "200px" }}
          >
            {notes.toReversed().map((note, idx) => (
              <NoteBox note={note} key={idx} />
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
      {/* <ToastContainer position="bottom-right" /> */}
    </Page>
  );
}
