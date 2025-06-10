import React, { useState } from 'react';
import Modal from './Modal';
import { getUserById, updateUser } from '../Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/UpdateUser.css";

const UpdateUserButton = ({ setEmployees }) => {
  const [showIdModal, setShowIdModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [empId, setEmpId] = useState('');
  const [userData, setUserData] = useState(null);

  const handleIdSubmit = async ({ emp_id }) => {
    try {
      const response = await getUserById(emp_id);
      if (response.status === 200 && response.data) {
        setEmpId(emp_id);
        setUserData(response.data);
        setShowIdModal(false);
        setShowEditModal(true);
        toast.success("User found. Please edit the details.");
      } else {
        toast.error("Employee ID not found.");
      }
    } catch (error) {
        console.error("Failed to fetch user",error);
        toast.error("Employee ID not found.");
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await updateUser(empId, updatedData);
      const updatedEmployee = (prev =>
        prev.map(emp => (emp.emp_id === empId ? response.data : emp))
      );
      setEmployees(updatedEmployee);
      toast.success("User_Data Updated Successfully!");
      setShowEditModal(false);
    } catch (error) {
      if (error.response?.status === 409) {
          toast.error(error.response.data.message); // Show custom duplicate message
      } else {
          toast.error("An unexpected error occurred.");
          console.error("Error creating user:", error);
        }
    }
  };

  return (
    <>
      <button className="update-user" onClick={() => setShowIdModal(true)}>Update User</button>

      {showIdModal && (
        <Modal
          title="Enter Employee ID"
          onSubmit={handleIdSubmit}
          onClose={() => setShowIdModal(false)}
          fields={[{ name: 'emp_id', label: 'Employee ID', required: true }]}
        />
      )}

      {showEditModal && userData && (
        <Modal
          title="Update User Details"
          onSubmit={handleUpdate}
          onClose={() => setShowEditModal(false)}
          fields={[
            { name: 'name', label: 'Name', defaultValue: userData.name, required: true },
            { name: 'email', label: 'Email', defaultValue: userData.email, required: true },
            { name: 'designation', label: 'Designation', defaultValue: userData.designation, required: true },
            { name: 'salary', label: 'Salary', defaultValue: userData.salary, required: true },
          ]}
        />
      )}
    </>
  );
};

export default UpdateUserButton;
