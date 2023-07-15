import "./App.css";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import { authReducer, initialReducerState } from "./reducers/authReducer";
import { useEffect, useReducer } from "react";
import AuthContext from "./context/authContext";
import DispatchAuthContext from "./context/dispatchAuthContext";
import Header from "./components/layout/Header";
import Landing from "./components/landing/Landing";
import Admin from "./components/admin/Admin";
import CreateUser from "./components/admin/CreateUser";
import Profile from "./components/profile/Profile";
import Applications from "./components/applications/Applications";
import EditApplication from "./components/applications/EditApplication";
import CreateApplication from "./components/applications/CreateApplication";
import CreateTask from "./components/tasks/CreateTask";
import CreatePlan from "./components/plans/CreatePlan";
import TaskManagement from "./components/tasks/TaskManagement";
import Kanban from "./components/kanban/Kanban";
import EditTask from "./components/tasks/EditTask";
import PromoteTask from "./components/tasks/PromoteTask";
import DemoteTask from "./components/tasks/DemoteTask";
import ViewTask from "./components/tasks/ViewTask";

function App() {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);

  return (
    <div>
      <AuthContext.Provider value={state}>
        <DispatchAuthContext.Provider value={dispatch}>
          <Header />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/admin/usermanagement" element={<Admin />}></Route>
            <Route path="/profile" element={<Profile />}></Route>

            {/* <Route path="/applications" element={<Applications />}></Route>
            <Route
              path="/applications/:appAcronym"
              element={<EditApplication />}
            ></Route>
            <Route
              path="/applications/create"
              element={<CreateApplication />}
            ></Route> */}

            <Route path="/applications">
              <Route index element={<Applications />} />
              <Route path="edit/:appAcronym" element={<EditApplication />} />
              <Route path=":appAcronym" element={<Kanban />} />
              <Route
                path=":appAcronym/:planNameQueryParam"
                element={<Kanban />}
              />

              <Route path="create" element={<CreateApplication />} />
            </Route>

            <Route path="/plans">
              {/* <Route index element={<Applications />} /> */}
              {/* <Route path=":appAcronym" element={<EditApplication />} /> */}
              <Route path="create/:appAcronym" element={<CreatePlan />} />
            </Route>

            <Route path="/tasks">
              <Route path="create/:appAcronym" element={<CreateTask />} />
              <Route path="edit/:taskId" element={<EditTask />} />
              <Route path="promote/:taskId" element={<PromoteTask />} />
              <Route path="demote/:taskId" element={<DemoteTask />} />
              <Route path="view/:taskId" element={<ViewTask />} />
            </Route>
          </Routes>
        </DispatchAuthContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
