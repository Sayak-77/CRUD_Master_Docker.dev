import React, { useState } from 'react';
import Modal from './Modal';
import { createUser } from '../Api';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "../Styles/CreateUser.css";

const CreateUserButton = ({ setEmployees }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (formData) => {
    try {
      const response = await createUser(formData);
      if (response.status === 201 || response.status === 200) {
          toast.success("User_Record Created Successfully!");
          const newUser = response.data;
          setEmployees(prev => [...prev, newUser]);
      } 
      else{
        toast.error(response.message || "Failed to create user.");
      }
    } 
    catch(error) {
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
      <button className="create-user" onClick={() => setShowModal(true)}>Create User</button>
      {showModal && (
        <Modal
          title="Create User"
          onSubmit={handleCreate}
          onClose={() => setShowModal(false)}
          fields={[
            { name: 'emp_id', label: 'Employee ID', required: true },
            { name: 'name', label: 'Name', required: true },
            { name: 'email', label: 'Email', required: true },
            { name: 'designation', label: 'Designation', required: true },
            { name: 'salary', label: 'Salary', required: true }
          ]}
        />
      )}
    </>
  );
};

export default CreateUserButton;
