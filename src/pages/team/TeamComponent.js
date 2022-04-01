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
    </div>
  );
}
