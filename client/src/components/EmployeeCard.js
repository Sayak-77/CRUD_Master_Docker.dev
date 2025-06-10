import React from 'react'
import "../Styles/EmployeeCard.css"

const EmployeeCard = ({ employee }) => {
  return (
    <div className='employee-card'>
      <h3>Employee_Name: {employee.name}</h3>
      <p>Emploee_ID: {employee.emp_id}</p>
      <p>Employee_Email: {employee.email}</p>
      <p>Employee_Designation: {employee.designation}</p>
      <p>Employee_Salary: ${employee.salary}</p>
    </div>
  )
}

export default EmployeeCard
