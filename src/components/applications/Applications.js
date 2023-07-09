import { Button, Divider, Table } from "antd";
import Page from "../page/Page";
import { useEffect, useState } from "react";
import { getApplications } from "../../urls/applications";
import { checkGroup } from "../../urls/userGroups";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import "./applications.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Spinner from "../layout/Spinner";
import { ToastContainer } from "react-toastify";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [isProjectLead, setIsProjectLead] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Applications.js useEffect firing");
    getApplicationsData();
    checkIfProjectManager();
  }, []);

  async function getApplicationsData() {
    const response = await getApplications();
    if (response.success) {
      const dataWithKey = response.data.map((record) => {
        return { ...record, key: record.App_Acronym };
      });
      setApplications(dataWithKey);
      setLoading(false);
    }
  }

  async function checkIfProjectManager() {
    const response = await checkGroup("projectManager");
    if (response.success) {
      setShowCreateButton(true);
    } else {
      setShowCreateButton(false);
    }
  }

  const columns = [
    {
      title: "App Acronym",
      dataIndex: "App_Acronym",
      key: "App_Acronym",
    },
    {
      title: "App Description",
      dataIndex: "App_description",
      key: "App_description",
    },
    {
      title: "App Running Number",
      dataIndex: "App_rnumber",
      key: "App_description",
    },
    {
      title: "App Start Date (YYYY-MM-DD)",
      dataIndex: "App_startdate",
      key: "App_startdate",
      render: (date) => {
        return dayjs(date).format("YYYY-MM-DD");
      },
    },
    {
      title: "App End Date (YYYY-MM-DD)",
      dataIndex: "App_enddate",
      key: "App_enddate",
      render: (date) => {
        return dayjs(date).format("YYYY-MM-DD");
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              console.log("record", record);
              navigate("/applications/edit/" + record.App_Acronym);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              console.log("record", record);
              navigate("/applications/" + record.App_Acronym);
            }}
          >
            View
          </Button>
        </>
      ),
    },
  ];

  if (warning) {
    return (
      <UnverifiedUser message="You do not have permission to access this resource" />
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Page>
      <div className="application-nav">
        <h3>Applications</h3>
        <Button type="primary" onClick={() => navigate("/applications/create")}>
          Create application
        </Button>
      </div>

      <Table dataSource={applications} columns={columns} />
      <ToastContainer position="bottom-right" theme="colored" />
    </Page>
  );
}
