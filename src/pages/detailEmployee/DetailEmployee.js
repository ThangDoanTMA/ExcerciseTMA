import React from 'react';

export default function DetailEmployee() {
  return (
    <div>
      <div className='d-flex justify-content-between mt-3'>
        <h4 className=''>Vo Chi Thanh</h4>
        <div>
          <button className='btn btn-outline mr-4 p-0'>
            <i className='fa-solid fa-pen-to-square fa-lg'></i>
          </button>
          <button className='btn btn-outline p-0 mr-3'>
            <i className='fa-solid fa-trash-can fa-lg'></i>
          </button>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4'>
          <img
            src='https://i.pravatar.cc/150?img=12'
            alt='...'
            className='w-100 p-2'
          />
          <div
            // style={{ margin: '0 auto' }}
            className='d-flex justify-content-center'
          >
            <span className='badge badge-primary mr-2'>No:2</span>
            <span className='badge badge-info'>Age: 22</span>
          </div>
          <div className='d-flex justify-content-center mt-2'>
            <span className='badge badge-warning'>Sex: Male</span>
          </div>
        </div>
        <div className='col-8'>
          <nav>
            <div className='nav nav-tabs' id='nav-tab' role='tablist'>
              <a
                className='nav-item nav-link active'
                id='nav-information-tab'
                data-toggle='tab'
                href='#nav-information'
                role='tab'
                aria-controls='nav-information'
                aria-selected='true'
              >
                INFORMATION
              </a>
              <a
                className='nav-item nav-link'
                id='nav-working-tab'
                data-toggle='tab'
                href='#nav-working'
                role='tab'
                aria-controls='nav-working'
                aria-selected='false'
              >
                WORKING
              </a>
              <a
                className='nav-item nav-link'
                id='nav-advances-tab'
                data-toggle='tab'
                href='#nav-advances'
                role='tab'
                aria-controls='nav-advances'
                aria-selected='false'
              >
                ADVANCES
              </a>
              <a
                className='nav-item nav-link'
                id='nav-statistics-tab'
                data-toggle='tab'
                href='#nav-statistics'
                role='tab'
                aria-controls='nav-statistics'
                aria-selected='false'
              >
                STATISTICS
              </a>
            </div>
          </nav>
          <div className='tab-content' id='nav-tabContent'>
            <div
              className='tab-pane fade show active'
              id='nav-information'
              role='tabpanel'
              aria-labelledby='nav-information-tab'
            >
              <div className='mt-4'>
                <h4>INFORMATION</h4>
                <div className='form-group row'>
                  <div className='col-6'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text' id='info-tab'>
                          Start Date:
                        </div>
                      </div>
                      <input
                        type='text'
                        className='form-control'
                        id='inlineFormInputGroup'
                        value={'17-01-2001'}
                      />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text' id='info-tab'>
                          Team:
                        </div>
                      </div>
                      <input
                        type='text'
                        className='form-control'
                        id='inlineFormInputGroup'
                        value={'IT Support'}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-6'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text' id='info-tab'>
                          Address:
                        </div>
                      </div>
                      <input
                        type='text'
                        className='form-control'
                        id='inlineFormInputGroup'
                        value={'Quy Nhon'}
                      />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text' id='info-tab'>
                          Salary per hour:
                        </div>
                      </div>
                      <input
                        type='text'
                        className='form-control'
                        id='inlineFormInputGroup'
                        value={'2'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='tab-pane fade'
              id='nav-working'
              role='tabpanel'
              aria-labelledby='nav-working-tab'
            >
              <div className='d-flex justify-content-between mt-3'>
                <h4 className=''>WORKING</h4>
                <div>
                  <button className='btn btn-outline mr-4 p-0'>
                    <i className='fa-solid fa-circle-plus fa-lg'></i>
                  </button>
                </div>
              </div>
              <table className='table table-striped mt-3'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Hour</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope='row'>1</td>
                    <td>17-01-2021</td>
                    <td>8</td>
                    <td>
                      <button className='btn btn-outline p-0 ml-3'>
                        <i className='fa-solid fa-trash-can fa-lg'></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className='tab-pane fade'
              id='nav-advances'
              role='tabpanel'
              aria-labelledby='nav-advances-tab'
            >
              <div className='d-flex justify-content-between mt-3'>
                <h4 className=''>ADVANCES</h4>
                <div>
                  <button className='btn btn-outline mr-4 p-0 '>
                    <i className='fa-solid fa-circle-plus fa-lg'></i>
                  </button>
                </div>
              </div>
              <table className='table table-striped mt-3'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Money</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope='row'>1</td>
                    <td>17-01-2021</td>
                    <td>60$</td>
                    <td>
                      <button className='btn btn-outline p-0 ml-3'>
                        <i className='fa-solid fa-trash-can fa-lg'></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className='tab-pane fade'
              id='nav-statistics'
              role='tabpanel'
              aria-labelledby='nav-statistics-tab'
            >
              <div className='mt-4'>
                <h4 className='mb-3'>STATISTICS</h4>
                <div>
                  <p>All salary : </p>
                  <p>Number of working days : </p>
                  <p>Total get : </p>
                  <p>Total advances : </p>
                  <p>Summary: </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
