import axios from "axios";

const API_URL = 'http://localhost:5001/api';

export const getAllUsers = async() => {
    try{
        const res= await axios.get(`${API_URL}/user`);
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const getUserById = async(emp_id) => {
    try{
        const res = await axios.get(`${API_URL}/user/${emp_id}`);
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const createUser = async(userData) => {
    try{
        const res = await axios.post(`${API_URL}/user`,userData);
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const updateUser = async(emp_id, userData) => {
    try{
        const res = await axios.put(`${API_URL}/user/${emp_id}`,userData);
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const deleteUser = async(emp_id) => {
    try{
        const res = await axios.delete(`${API_URL}/user/${emp_id}`);
        return res.data;
    }
    catch(error){
        throw error;
    }
};