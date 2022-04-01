import React from 'react';

export default function () {
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
            <form type='submit' className='modal-body'>
              f
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
