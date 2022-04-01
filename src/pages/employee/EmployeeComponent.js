import React from 'react';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  InfoOutlined,
} from '@ant-design/icons';
import Modal from '../../components/Modal';

export default function EmployeeComponent() {
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
            <DeleteOutlined style={{ fontSize: '24px', color: 'black' }} />
          </button>
        </div>
      </div>

      <div className='row mt-3'>
        <p className='col-6'>Total 6 employees</p>
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
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>No</th>
            <th>FullName</th>
            <th>Phone</th>
            <th>Team</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td scope='row'>1</td>
            <td>Tran Thi Huong</td>
            <td>5021222</td>
            <td>IT Support</td>
            <td>
              <button className='btn btn-outline mr-4 p-0'>
                <InfoOutlined />
              </button>
              <button className='btn btn-outline p-0'>
                <DeleteOutlined />
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td scope='row'>2</td>
            <td>Tran Thi Huong</td>
            <td>5021222</td>
            <td>IT Support</td>
            <td>
              <button className='btn btn-outline mr-4 p-0'>
                <InfoOutlined />
              </button>
              <button className='btn btn-outline p-0'>
                <DeleteOutlined />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal />
    </div>
  );
}
