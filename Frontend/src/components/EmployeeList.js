import React from 'react';
import apiClient from '../services/api';


const EmployeeList = (props) => {
    // const list=[props.employees];
    const employees1 = props.employees.map((employee,index) =>
        <option value={employee.id} key={employee.id} >{employee.name}</option>

    );
    
        return (
            
            <select className="custom-select" onChange={(e) => { props.onChangeEmployeeId(e.target.value) }} >
                <option value={0}>Show Employee</option>{employees1}
            </select>
        );
    
    
};

export default EmployeeList;