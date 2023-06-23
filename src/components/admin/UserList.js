import { Button, Space, Table } from "antd";

export default function UserList({ users, handleSelectUser }) {
  const columns = [
    { title: "username", dataIndex: "username", key: "username" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "user group", dataIndex: "userGroup", key: "userGroup" },
    {
      title: "status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => (text === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleSelectUser(record)}>Edit</Button>
      ),
    },
  ];

  return (
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary: "#1D3557",
    //       // colorFillSecondary: "#A8DADC",
    //     },
    //   }}
    // >
    <Table dataSource={users} columns={columns} />
    // </ConfigProvider>
  );
}
