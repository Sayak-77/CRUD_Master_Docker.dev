import React from 'react';
import { getAllUsers } from '../Api';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "../Styles/GetAllUsers.css";

const GetAllUsersButton = ({setEmployees}) => {
  const handleGetAllUsers = async() => {
    try {
      const response = await getAllUsers();
      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        setEmployees(response.data);
        toast.success("Users_Data Fetched Successfully!");
      } else {
        toast.error(response.message || "No Users Found.");
      }
    } catch (error) {
      console.error("Error Fetching Users:", error);
      toast.error(error.response.data.message || "No Users Found.");
    }
  };

  return (
    <div>
      <button className="get-users-button" onClick={handleGetAllUsers}>Get All Users</button>
    </div>
  )
}

export default GetAllUsersButton
