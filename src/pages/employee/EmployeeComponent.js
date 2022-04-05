import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Modal from '../../components/Modal';
import axios from 'axios';
import { EMPLOYEE_PER_PAGE } from '../../utils/constants';

export default function EmployeeComponent() {
  const [employees, SetEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  console.log(pages);

  console.log(employees);
  useEffect(() => {
    try {
      const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:8080/employee/list');
        SetEmployees(res.data);

        setTotalPages(Math.ceil(res.data.length / EMPLOYEE_PER_PAGE));
      };
      fetchEmployees();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const startIndex = (page - 1) * EMPLOYEE_PER_PAGE;
  const selectedEmployees = employees.slice(
    startIndex,
    startIndex + EMPLOYEE_PER_PAGE,
  );

  const handleClickPagination = (num) => {
    setPage(num);
  };

  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-between'>
        <h3 className='display-5'>Employee</h3>
        <div>
          <button className='btn btn-outline mr-4 p-0'>
            <PlusCircleOutlined
              style={{ fontSize: '24px', color: 'black' }}
              data-toggle='modal'
              data-target='#modelId'
              type='button'
            />
          </button>
          <button className='btn btn-outline p-0 mr-3'>
            <i className='fa-solid fa-trash fa-lg'></i>
          </button>
        </div>
      </div>

      <div className='row mt-3'>
        <p className='col-6'>Total {employees.length} employees</p>
        <div className='col-6'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <button
                className='input-group-text btn btn-primary'
                id='basic-addon1'
              >
                <SearchOutlined />
              </button>
            </div>
            <input
              type='text'
              className='form-control w-30'
              placeholder='Search employee by name'
            />
          </div>
        </div>
      </div>
      <p>Search result</p>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <th>No</th>
            <th>FullName</th>
            <th>Phone</th>
            <th>Team</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {selectedEmployees.map((employee, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type='checkbox' />
                </td>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.idTeam}</td>
                <td>
                  <button className='btn btn-outline mr-4 p-0'>
                    <i className='fa-solid fa-info'></i>
                  </button>
                  <button className='btn btn-outline p-0'>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {pages.map((num, index) => (
          <button
            className='btn btn-outline-primary ml-2'
            key={index}
            onClick={() => handleClickPagination(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <Modal />
    </div>
  );
}
