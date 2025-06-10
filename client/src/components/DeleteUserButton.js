import React, { useState } from 'react';
import Modal from './Modal';
import { deleteUser } from '../Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/DeleteUser.css";

const DeleteUserButton = ({ setEmployees }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async ({ emp_id }) => {
    try {
      const response = await deleteUser(emp_id);
      
      if (response.status === 200 || response.status === 204) {
        setEmployees(prev => prev.filter(emp => emp.emp_id !== parseInt(emp_id)));
        toast.success("User_Record Deleted Successfully!");
      } else {
        toast.error("User not found or could not be deleted.");
      }
    } catch (error) {
      console.error("Error deleting user.", error);
      toast.error("User Does Not Exist!" || error.response.data.message);
    }
    setShowModal(false);
  };

  return (
    <>
      <button className="delete-user" onClick={() => setShowModal(true)}>Delete User</button>

      {showModal && (
        <Modal
          title="Delete User by ID"
          onSubmit={handleDelete}
          onClose={() => setShowModal(false)}
          fields={[
            { name: 'emp_id', label: 'Employee ID', required: true }
          ]}
        />
      )}
    </>
  );
};

export default DeleteUserButton;
