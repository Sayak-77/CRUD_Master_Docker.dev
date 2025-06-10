import React, { useState } from 'react';
import Modal from './Modal';
import { getUserById } from '../Api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "../Styles/GetUserById.css";

const GetUserByIdButton = ({setEmployees}) => {
    const [showModal, setShowModal] = useState(false);

    const handlefetch = async ({ emp_id }) => {
    try {
      const response = await getUserById(emp_id);
      if(response.status === 200 && response.data){
        setEmployees([response.data]); 
        toast.success("User_Data Fetched Successfully!");
      }
      else if(response.status === 404){ 
        toast.error(response.message || "No User Found.");
    }
    } catch (error) {
        console.error("Failed to fetch user",error);
        toast.error(error.response.data.message);
    }
  };

  return (
    <div>
        <button className="get-user-button" onClick={() => setShowModal(true)}>Get User By Id</button>
        {showModal && (
            <Modal
                title="Get User by ID"
                onSubmit={handlefetch}
                onClose={() => setShowModal(false)}
                fields={[
                    { name: 'emp_id', label: 'Employee ID', required: true }
                ]}
            />
        )}
    </div>
  )
};

export default GetUserByIdButton
