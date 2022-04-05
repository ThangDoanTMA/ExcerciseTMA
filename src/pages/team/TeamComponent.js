import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export default function TeamComponent() {
  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-between'>
        <h3 className='display-5'>Team</h3>
        <div>
          <button className='btn btn-outline p-0 mr-3'>
            <PlusCircleOutlined style={{ fontSize: '24px', color: 'black' }} />
          </button>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4'>
          <p>Total 3 teams</p>
          <table className='table table-striped mt-3'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name Team</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope='row'>1</td>
                <td>IT Support</td>
                <td>
                  <button className='btn btn-outline p-0'>
                    <i className='fa-solid fa-clipboard-list'></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-8'>
          <p>Result all employee team Manager - Total 3 employees</p>
          <table className='table table-striped mt-3'>
            <thead>
              <tr>
                <th>No</th>
                <th>FullName</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Sex</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope='row'>1</td>
                <td>Tran Thi Huong</td>
                <td>097845454</td>
                <td>TP Ho Chi Minh</td>
                <td>Female</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
