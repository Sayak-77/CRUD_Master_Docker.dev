import pool from "../config/db.js";

export const getAllUsersQuery = async () => {
    const result = await pool.query("SELECT * FROM employee");
    return result.rows;
}; 

export const getUserByIdQuery = async (emp_id) => {
    const result = await pool.query("SELECT * FROM employee where emp_id = $1",[emp_id]);
    return result.rows[0];
};

export const createUserQuery = async (emp_id, name, email, designation, salary) => {
    const result = await pool.query("INSERT INTO employee (emp_id, name, email, designation, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *",[emp_id,name,email,designation,salary]);
    return result.rows[0];
};

export const updateUserQuery = async (emp_id, name, email, designation, salary) => {
    const result = await pool.query("UPDATE employee SET name=$1, email=$2, designation=$3, salary=$4 WHERE emp_id=$5 RETURNING *",[name,email,designation,salary,emp_id])
    return result.rows[0]
};

export const deleteUserQuery = async (emp_id) => {
    const result = await pool.query("DELETE FROM employee WHERE emp_id=$1 RETURNING *",[emp_id]);
    return result.rows[0];
};