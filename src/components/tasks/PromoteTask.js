import Page from "../page/Page";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import {
  checkUserCanPerformAction,
  editTask,
  getTask,
  promoteTask,
} from "../../urls/tasks";
import TextArea from "antd/es/input/TextArea";
import { getPlanByAppAcronym } from "../../urls/plans";
import NoteBox from "./NoteBox";
import { ACTION_PERMISSION_COLUMNS } from "../../constants/taskState";
import Spinner from "../layout/Spinner";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";

const ACTION_WORDS = {
  open: "release",
  todo: "promote",
  doing: "promote",
  done: "approve",
};

export default function PromoteTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editPlanDisabled, setEditPlanDisabled] = useState(true);
  const [actionWord, setActionWord] = useState("");
  const [currentTask, setCurrentTask] = useState();

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
      const task = response.data[0];
      setCurrentTask(task);

      const appAcronym = task.Task_app_acronym;
      const taskState = task.Task_state;
      const actionName = ACTION_PERMISSION_COLUMNS[taskState];

      if (taskState !== "done") {
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

      // Cannot promote beyond "closed" state
      if (taskState === "closed") {
        setUnauthorized(true);
      }

      setActionWord(ACTION_WORDS[taskState]);

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

    const promoteResponse = await promoteTask(
      taskId,
      vals.taskName,
      vals.taskDescription,
      vals.taskPlan,
      vals.taskNote
    );
    if (promoteResponse.success) {
      setTimeout(() => {
        toast.success(`Task ${actionWord} successfully`);
      }, 1);

      navigate(`/applications/${appAcronym}`);
    } else {
      toast.error(
        promoteResponse?.message
          ? promoteResponse.message
          : "Failed to update task"
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
      <h3>
        {actionWord} Task {taskId}
      </h3>
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit and {actionWord} task
            </Button>
          </Form.Item>
        </Space>
      </Form>
      {/* <ToastContainer position="bottom-right" /> */}
    </Page>
  );
}
