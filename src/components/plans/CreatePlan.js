import { Button, DatePicker, Form, Input, Select } from "antd";
import Page from "../page/Page";
import TextArea from "antd/es/input/TextArea";

export default function CreatePlan() {
  const { RangePicker } = DatePicker;

  return (
    <Page>
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
          name="appAcronym"
          rules={[
            {
              required: true,
              message: "App acronym is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="App Description" name="appDescription">
          <TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Form.Item>

        <Form.Item label="When task is open" name="appPermitOpen">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item>

        {/* <Form.Item label="When task is in to-do list" name="appPermitTodolist">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item> */}

        {/* <Form.Item label="When task is doing" name="appPermitDoing">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item> */}

        {/* <Form.Item label="When task is done" name="appPermitDone">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={userGroups.map((groupName) => {
              return { value: groupName, label: groupName };
            })}
          />
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer position="bottom-right" theme="colored" />
    </Page>
  );
}
