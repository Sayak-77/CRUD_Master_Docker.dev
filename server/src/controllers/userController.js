import { createUserQuery, deleteUserQuery, getAllUsersQuery, getUserByIdQuery, updateUserQuery } from "../models/userModels.js";

//Response Function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const getAllUsers = async(req, res, next) => {
    try{
        const users = await getAllUsersQuery();
        handleResponse(res, 200, "Users_List Fetched Succesfully", users);
    }
    catch(err){
        next(err)
    }
};

export const getUserById = async(req, res, next) => {
    try{
        const user = await getUserByIdQuery(req.params.emp_id);
        if(!user){
            return handleResponse(res, 404, "User Not Found!");
        }
        handleResponse(res, 200, "User_Data Fetched Succesfully", user)
    }
    catch(err){
        next(err);
    }
};

export const createUser = async(req, res, next) => {
    const {emp_id, name, email, designation, salary} = req.body;
    try{
        const newUser = await createUserQuery(emp_id, name, email, designation, salary);
        handleResponse(res, 201, "New_User Created Succesfully", newUser);
    }
    catch(err){
        if (err.code === '23505') {
            return res.status(409).json({
                status: 409,
                message: 'Employee ID or Email already exists',
            });
        }
        next(err);
    }
};

export const updateUser = async(req, res, next) => {
    const {name, email, designation, salary} = req.body;
    try{
        const updated_user = await updateUserQuery(req.params.emp_id,name, email, designation, salary);
        if(!updated_user){
            return handleResponse(res, 404, "User Not Found!");
        }
        handleResponse(res, 200, "User_Data Updated Succesfully", updated_user);
    }
    catch(err){
        if (err.code === '23505') {
            return res.status(409).json({
                status: 409,
                message: 'Employee ID or Email already exists',
            });
        }
        next(err);
    }
};

export const deleteUser = async(req, res, next) => {
    try{
        const deleted_user = await deleteUserQuery(req.params.emp_id);
        if(!deleted_user){
            return handleResponse(res, 404, "User Not Found!");
        }
        handleResponse(res, 200, "User_Data Deleted Succesfully", deleted_user);
    }
    catch(err){
        next(err);
    }
};