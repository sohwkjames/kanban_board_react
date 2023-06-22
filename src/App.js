import "./App.css";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import { authReducer, initialReducerState } from "./reducers/authReducer";
import { useReducer } from "react";
import AuthContext from "./context/authContext";
import DispatchAuthContext from "./context/dispatchAuthContext";
import Header from "./components/layout/Header";
import Landing from "./components/landing/Landing";
import Admin from "./components/admin/Admin";
import CreateUser from "./components/admin/CreateUser";

function App() {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);

  return (
    <div>
      <AuthContext.Provider value={state}>
        <DispatchAuthContext.Provider value={dispatch}>
          <Header />

          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/admin/create" element={<CreateUser />}></Route>
          </Routes>
        </DispatchAuthContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
