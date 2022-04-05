import React from 'react';

export default function () {
  const handleChangeInput = (e) => {
    console.log('change');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div
        className='modal fade'
        id='modelId'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content border-0'>
            <div className='modal-header  bg-primary text-white'>
              <h5 className='modal-title'>Add new Employee</h5>
            </div>
            <form
              type='submit'
              className='modal-body  mb-3'
              onSubmit={handleSubmit}
            >
              <div className='form-group'>
                <small className='form-text text-muted'>
                  Full name employee *
                </small>
                <input
                  className='form-control'
                  name='name'
                  type='text'
                  placeholder='Enter full name'
                  onChange={handleChangeInput}
                />
              </div>
              <div className='form-group row'>
                <div className='col-6'>
                  <small className='form-text text-muted'>Address *</small>
                  <input
                    className='form-control'
                    name='address'
                    type='text'
                    placeholder='Enter address'
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='col-6'>
                  <small className='form-text text-muted'>Sex employee *</small>
                  <div className='form-group'>
                    <select className='form-control' name='sex'>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-6'>
                  <small className='form-text text-muted'>Age employee *</small>
                  <input
                    className='form-control'
                    name='age'
                    type='text'
                    placeholder='Enter age'
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='col-6'>
                  <small className='form-text text-muted'>Start day *</small>
                  <div className='form-group'>
                    <input
                      type='date'
                      name='startday'
                      className='form-control'
                    />
                  </div>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-6'>
                  <small className='form-text text-muted'>Money/hour *</small>
                  <input
                    className='form-control'
                    name='salaryPerHour'
                    type='text'
                    placeholder='Enter salary per hour'
                    onChange={handleChangeInput}
                  />
                </div>
                <div className='col-6'>
                  <small className='form-text text-muted'>Phone number *</small>
                  <input
                    className='form-control'
                    name='phoneNumber'
                    type='text'
                    placeholder='Enter phone number'
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            </form>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-outline'
                data-dismiss='modal'
              >
                CANCEL
              </button>
              <button type='button' className='btn btn-outline '>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
