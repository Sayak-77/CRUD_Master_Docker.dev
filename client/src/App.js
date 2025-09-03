import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetAllUsersButton from "./components/GetAllUsersButton";
import EmployeeCard from "./components/EmployeeCard";
import GetUserByIdButton from "./components/GetUserByIdButton";
import CreateUserButton from "./components/CreateUserButton";
import UpdateUserButton from "./components/UpdateUserButton";
import DeleteUserButton from "./components/DeleteUserButton";
import Login from "./components/Login";

const AuthPage = () =>  {

  return (
    <div className="auth-wrapper">
      <Login/>
    </div>
  );
}

// Home Page Layout
const Home = () => {
  const [employees, setEmployees] = useState([]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />

      <h1 className="heading-box">EMPLOYEE MANAGEMENT SYSTEM</h1>
      <div className="button-group">
        <GetAllUsersButton setEmployees={setEmployees} />
        <GetUserByIdButton setEmployees={setEmployees} />
        <CreateUserButton setEmployees={setEmployees} />
        <UpdateUserButton setEmployees={setEmployees} />
        <DeleteUserButton setEmployees={setEmployees} />
      </div>

      <div className="employee-record">EMPLOYEE_RECORDS</div>
      <div className="employee-list">
        {Array.isArray(employees) &&
          employees.map((employee) => (
            <EmployeeCard key={employee.emp_id} employee={employee} />
          ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcomelogin" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
