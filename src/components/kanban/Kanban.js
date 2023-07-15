import Page from "../page/Page";
import KanbanHeader from "./KanbanHeader";
import KanbanBody from "./KanbanBody";
import "./kanban.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  checkUserCanPerformAction,
  getTaskByApp,
  getTaskByPlan,
} from "../../urls/tasks";
import { getPlanByAppAcronym } from "../../urls/plans";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Spinner from "../layout/Spinner";

export default function Kanban() {
  const { appAcronym, planNameQueryParam } = useParams();
  const [createPlanVisible, setCreatePlanVisible] = useState(false);
  const [createTaskVisible, setCreateTaskVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fireGetTaskByApp();
    checkIsProjectManager();
    getPlans();
    checkUserCanCreateTask();
  }, []);

  useEffect(() => {
    if (planNameQueryParam && selectedPlan) {
      fireGetTaskByPlan(selectedPlan.Plan_mvp_name);
    } else if (planNameQueryParam) {
      fireGetTaskByPlan(planNameQueryParam);
    } else if (selectedPlan) {
      fireGetTaskByPlan(selectedPlan.Plan_mvp_name);
    } else {
      fireGetTaskByApp();
    }
  }, [selectedPlan]);

  async function fireGetTaskByApp() {
    setLoading(true);
    const response = await getTaskByApp(appAcronym);
    if (response.success) {
      setTasks(response.data);
      setLoading(false);
    } else {
    }
  }

  async function fireGetTaskByPlan(planName) {
    setLoading(true);
    const response = await getTaskByPlan(appAcronym, planName);
    if (response.success) {
      setTasks(response.data);
      setLoading(false);
    }
  }

  async function checkIsProjectManager() {
    const isProjectManager = await checkUserCanPerformAction(
      appAcronym,
      "App_permit_open"
    );
    if (isProjectManager.success) {
      setCreatePlanVisible(true);
    }
  }

  // async function handlePlanInQueryParameter() {
  //   if (planNameQueryParam) {
  //     const response = await getTaskByPlan(appAcronym, planNameQueryParam);
  //     setSelectedPlan(planNameQueryParam)

  //   }
  // }

  async function getPlans() {
    const plansResponse = await getPlanByAppAcronym(appAcronym);
    setPlans(plansResponse.data);
  }

  async function checkUserCanCreateTask() {
    const result = await checkUserCanPerformAction(
      appAcronym,
      "App_permit_create"
    );
    if (result.success) {
      setCreateTaskVisible(true);
    }
  }

  let plansMenu = plans.map((p) => {
    return {
      key: p.Plan_mvp_name,
      label: (
        <div
          style={{
            borderLeft: `10px solid ${p.Plan_colour}`,
            paddingLeft: "5px",
          }}
        >
          {p.Plan_mvp_name}
        </div>
      ),
    };
  });

  plansMenu.splice(0, 0, { key: "SELECT_PLAN", label: "Select Plan" });

  const onClick = ({ key }) => {
    console.log("onClick firing", key);
    console.log("onClick firing", plans);
    const result = plans.filter((p) => p.Plan_mvp_name === key);

    if (key === "SELECT_PLAN") {
      // console.log("in if branch");
      setSelectedPlan(null);
    } else {
      // navigate(`/applications/${appAcronym}/${key}`);
      // setSelectedPlan(result[0].Plan_mvp_name);
      setSelectedPlan(result[0]);

      console.log("Set selected plan as", result[0]);
    }
  };

  return (
    <Page>
      <div className="heading">
        <div className="appname">
          <h3>{appAcronym}</h3>
        </div>
        <div className="right-side">
          <div className="date">
            <div className="planlist">
              <Dropdown
                menu={{
                  items: plansMenu,
                  onClick,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  {" "}
                  <Space>
                    {selectedPlan ? selectedPlan.Plan_mvp_name : "Select Plan"}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <p>Start date: {selectedPlan?.Plan_startdate}</p>
            <p>End date: {selectedPlan?.Plan_enddate}</p>
          </div>

          <div className="buttons">
            {createPlanVisible && (
              <Button
                onClick={() => navigate(`/plans/create/${appAcronym}`)}
                type="primary"
              >
                Create Plan
              </Button>
            )}
            {createTaskVisible && (
              <Button
                onClick={() => navigate(`/tasks/create/${appAcronym}`)}
                type="primary"
              >
                Create Task
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* <KanbanHeader /> */}
      {loading ? (
        <Spinner />
      ) : (
        <KanbanBody
          tasks={tasks}
          appAcronym={appAcronym}
          planName={
            selectedPlan ? selectedPlan.Plan_mvp_name : planNameQueryParam
          }
        />
      )}
    </Page>
  );
}
