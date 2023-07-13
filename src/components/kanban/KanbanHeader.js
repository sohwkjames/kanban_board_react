import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkGroup } from "../../urls/userGroups";
import { Button, Dropdown, Space } from "antd";
import "./kanban.css";
import Page from "../page/Page";
import { getAllPlans, getPlanByAppAcronym } from "../../urls/plans";
import { DownOutlined } from "@ant-design/icons";
import { checkUserCanPerformAction } from "../../urls/tasks";

export default function KanbanHeader(props) {
  const { appAcronym, planName } = useParams();
  const [createPlanVisible, setCreatePlanVisible] = useState(false);
  const [createTaskVisible, setCreateTaskVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlans] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    checkIsProjectManager();
    getPlans();
    checkUserCanCreateTask();
  }, []);

  async function checkIsProjectManager() {
    const isProjectManager = await checkUserCanPerformAction(
      appAcronym,
      "App_permit_open"
    );
    if (isProjectManager.success) {
      setCreatePlanVisible(true);
    }
  }

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

  const items = [
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  let plansMenu = plans.map((p) => {
    return {
      key: p.Plan_mvp_name,
      label: <div style={{ backgroundColor: "red" }}>p.Plan_mvp_name</div>,
    };
  });
  plansMenu.splice(0, 0, { key: "SELECT_PLAN", label: "Select Plan" });

  const onClick = ({ key }) => {
    const result = plans.filter((p) => p.Plan_mvp_name === key);
    setSelectedPlans(result[0]);
    console.log("Set selected plan as", result[0]);

    if (key === "SELECT_PLAN") {
      console.log("in if branch");
      navigate(`/applications/${appAcronym}`);
    } else {
      console.log("in else branch");
      navigate(`/applications/${appAcronym}/${key}`);
    }
  };

  return (
    <>
      <div className="heading">
        <div className="appname">
          <h3>{appAcronym}</h3>
        </div>
        <div className="right-side">
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
                  {planName ? planName : "Select Plan"}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="date">
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
    </>
  );
}
