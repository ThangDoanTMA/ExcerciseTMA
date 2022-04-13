import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

export default function DetailEmployee(props) {
  const [employee, setEmployee] = useState({});
  const [teams, setTeams] = useState([]);
  const employeeId = props.match.params.id;
  const [workingList, setWorkingList] = useState([]);
  const [advanceList, setAdvanceList] = useState([]);
  const [newWorking, setNewWorking] = useState({});
  const [newAdvance, setNewAdvance] = useState({});

  const updateInfoEmployee = async () => {
    try {
      const updateEmployee = async () => {
        const res = await axios.put(
          'http://localhost:8080/employee/update=' + employee.id,
          employee,
        );
        await fetchData();
      };
      updateEmployee();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await Promise.all([
        axios.get('http://localhost:8080/employee/' + employeeId),
        axios.get('http://localhost:8080/team/list'),
      ]);
      const employee = res[0].data.data;
      const teams = res[1].data;
      const renderTeam = () => {
        for (let i = 0; i < teams.length; i++) {
          if (teams[i].id === employee.idTeam) {
            employee.team = teams[i].teamName;
          }
        }
      };
      await renderTeam();
      await setEmployee(employee);
      await setTeams(teams);
      await setWorkingList(employee.working);
      await setAdvanceList(employee.advances);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [employee]);
  useEffect(() => {}, [workingList]);

  const renderWorkingTable = () => {
    if (workingList.length !== 0) {
      return workingList.map((data, index) => {
        return (
          <tr key={index} className='text-center'>
            <td scope='row'>{index + 1}</td>
            <td>{data.dateWorking}</td>
            <td>{data.hourWorking}</td>
            <td>
              <button
                className='btn btn-outline p-0 ml-3'
                onClick={() => {
                  swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this data!',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      const newWorkingList = workingList.splice(index, 1);
                      setEmployee(employee);
                      updateInfoEmployee();
                      swal('This employee has been deleted!', {
                        icon: 'success',
                      });
                    }
                  });
                }}
              >
                <i className='fa-solid fa-trash-can fa-lg'></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td scope='row' colSpan='4'>
            No data
          </td>
        </tr>
      );
    }
  };

  const renderAdvanceList = () => {
    if (advanceList.length !== 0) {
      return advanceList.map((data, index) => {
        return (
          <tr key={index} className='text-center'>
            <td scope='row'>{index + 1}</td>
            <td>{data.dateAdvance}</td>
            <td>{data.moneyAdvance}$</td>
            <td>
              <button
                className='btn btn-outline p-0 ml-3'
                onClick={() => {
                  swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this data!',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      const newAdvanceList = advanceList.splice(index, 1);
                      setEmployee(employee);
                      updateInfoEmployee();
                      swal('This employee has been deleted!', {
                        icon: 'success',
                      });
                    }
                  });
                }}
              >
                <i className='fa-solid fa-trash-can fa-lg'></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td scope='row' colSpan='4'>
            No data
          </td>
        </tr>
      );
    }
  };

  const handleChangeWorking = (e) => {
    setNewWorking({ ...newWorking, [e.target.name]: e.target.value });
  };

  const handleSubmitWorking = (e) => {
    e.preventDefault();
    workingList.push(newWorking);
    swal({
      title: 'Good job!',
      text: 'Created a new employee!',
      icon: 'success',
      button: 'Yahoooo!',
    });
    updateInfoEmployee();
  };

  const handleChangeAdvance = (e) => {
    setNewAdvance({ ...newAdvance, [e.target.name]: e.target.value });
  };

  const handleSubmitAdvance = (e) => {
    e.preventDefault();
    advanceList.push(newAdvance);
    swal({
      title: 'Good job!',
      text: 'Created a new employee!',
      icon: 'success',
      button: 'Yahoooo!',
    });
    updateInfoEmployee();
  };

  const renderOption = () => {
    return teams.map((team, index) => {
      return (
        <option value={team.id} key={team.id}>
          {team.teamName}
        </option>
      );
    });
  };

  const handleChangeInputUpdate = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmitUpdate = (e) => {
  //   e.preventDefault();
  //   updateInfoEmployee();
  //   swal({
  //     title: 'Good job!',
  //     text: 'Created a new employee!',
  //     icon: 'success',
  //     button: 'Yahoooo!',
  //   });
  //   fetchData();
  // };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // data.preventDefault();
    employee.avatar = data.data[0].name;
    updateInfoEmployee();
    swal({
      title: 'Good job!',
      text: 'Created a new employee!',
      icon: 'success',
      button: 'Yahoooo!',
    });
    // try {
    //   const uploadFile = async () => {
    //     const res = await axios.post(
    //       'http://localhost:8080/uploadfile',
    //       data.data[0],
    //     );
    //   };
    //   uploadFile();
    // } catch (error) {
    //   console.log(error);
    // }
    fetchData();
    console.log(data.data[0]);
    console.log(employee);
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between mt-3'>
        <h4 className=''>{employee.name}</h4>
        <div>
          <button
            className='btn btn-outline mr-4 p-0'
            data-toggle='modal'
            data-target='#modelUpdate'
          >
            <i className='fa-solid fa-pen-to-square fa-lg'></i>
          </button>
          <button
            className='btn btn-outline p-0 mr-3'
            onClick={() => {
              swal({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover this data!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  try {
                    const deleteEmployee = async () => {
                      const res = await axios.post(
                        'http://localhost:8080/employee/delete=' + employee.id,
                      );
                    };
                    deleteEmployee();
                  } catch (error) {
                    console.log(error.message);
                  }
                  swal('This employee has been deleted!', {
                    icon: 'success',
                  });
                  props.history.goBack();
                } else {
                  swal('Your data is safe!');
                }
              });
            }}
          >
            <i className='fa-solid fa-trash-can fa-lg'></i>
          </button>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4'>
          <img
            src={'/images/' + employee.avatar}
            alt='...'
            className='w-100 p-2'
            style={{ height: '400px' }}
          />
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <input name='avatar' {...register('data')} type='file' />
            <button>Submit</button>
          </form> */}
          <div className='d-flex justify-content-center'>
            <span className='badge badge-primary mr-2'>No:{employee.id}</span>
            <span className='badge badge-info'>Age: {employee.age}</span>
          </div>
          <div className='d-flex justify-content-center mt-2'>
            <span className='badge badge-warning'>Sex: {employee.sex}</span>
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
                <h4 className='mb-4'>INFORMATION</h4>
                <div className='form-group row'>
                  <div className='col-6'>
                    <div className='alert alert-secondary' role='alert'>
                      Start Date: {employee.startDay}
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='alert alert-secondary' role='alert'>
                      Team: {employee.team}
                    </div>
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='col-6'>
                    <div className='alert alert-secondary' role='alert'>
                      Address: {employee.address}
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='alert alert-secondary' role='alert'>
                      Salary per hour: {employee.salaryPerHour}$
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='modal fade'
              id='modelUpdate'
              tabIndex={-1}
              role='dialog'
              aria-labelledby='modelTitleId'
              aria-hidden='true'
            >
              <div className='modal-dialog' role='document'>
                <div className='modal-content border-0'>
                  <div className='modal-header  bg-primary text-white'>
                    <h5 className='modal-title'>Update Employee</h5>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    // onSubmit={handleSubmitUpdate}
                    className='modal-body'
                  >
                    <div className='form-group'>
                      <small className='form-text text-muted'>
                        Full name employee *
                      </small>
                      <input
                        className='form-control'
                        name='name'
                        type='text'
                        defaultValue={employee.name}
                        onChange={handleChangeInputUpdate}
                      />
                    </div>
                    <div className='form-group row'>
                      <div className='col-6'>
                        <small className='form-text text-muted'>
                          Address *
                        </small>
                        <input
                          className='form-control'
                          name='address'
                          type='text'
                          defaultValue={employee.address}
                          onChange={handleChangeInputUpdate}
                        />
                      </div>
                      <div className='col-6'>
                        <small className='form-text text-muted'>Avatar</small>
                        <div className='input-group mb-3'>
                          <div className='custom-file'>
                            <input
                              type='file'
                              name='avatar'
                              {...register('data')}
                              className='custom-file-input'
                              // onChange={handleChangeInputUpdate}
                            />
                            <label className='custom-file-label'>
                              Choose file
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='form-group row'>
                      <div className='col-6'>
                        <small className='form-text text-muted'>Team *</small>
                        <div className='form-group'>
                          <select
                            className='form-control'
                            name='idTeam'
                            defaultValue={employee.idTeam}
                            onChange={handleChangeInputUpdate}
                          >
                            {renderOption()}
                          </select>
                        </div>
                      </div>
                      <div className='col-6'>
                        <small className='form-text text-muted'>
                          Sex employee *
                        </small>
                        <div className='form-group'>
                          <select
                            className='form-control'
                            name='sex'
                            defaultValue={employee.sex}
                            onChange={handleChangeInputUpdate}
                          >
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='form-group row'>
                      <div className='col-6'>
                        <small className='form-text text-muted'>
                          Age employee *
                        </small>
                        <input
                          className='form-control'
                          name='age'
                          type='text'
                          defaultValue={employee.age}
                          onChange={handleChangeInputUpdate}
                        />
                      </div>
                      <div className='col-6'>
                        <small className='form-text text-muted'>
                          Start day *
                        </small>
                        <div className='form-group'>
                          <input
                            type='date'
                            name='startDay'
                            className='form-control'
                            defaultValue={employee.startDay}
                            onChange={handleChangeInputUpdate}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='form-group row'>
                      <div className='col-6'>
                        <small className='form-text text-muted'>
                          Money/hour *
                        </small>
                        <input
                          className='form-control'
                          name='salaryPerHour'
                          type='text'
                          defaultValue={employee.salaryPerHour}
                          onChange={handleChangeInputUpdate}
                        />
                      </div>
                      <div className='col-6'>
                        <small className='form-text text-muted'>
                          Phone number *
                        </small>
                        <input
                          className='form-control'
                          name='phoneNumber'
                          type='text'
                          defaultValue={employee.phoneNumber}
                          onChange={handleChangeInputUpdate}
                        />
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-outline'
                        data-dismiss='modal'
                      >
                        CANCEL
                      </button>
                      <button type='submit' className='btn btn-outline'>
                        UPDATE
                      </button>
                    </div>
                  </form>
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
                  <button
                    className='btn btn-outline mr-4 p-0'
                    data-toggle='modal'
                    data-target='#exampleModal1'
                  >
                    <i className='fa-solid fa-circle-plus fa-lg'></i>
                  </button>
                </div>
              </div>
              <div
                className='modal fade'
                id='exampleModal1'
                tabIndex={-1}
                role='dialog'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog' role='document'>
                  <div className='modal-content'>
                    <div className='modal-header bg-primary text-white'>
                      <h5 className='modal-title' id='exampleModalLabel'>
                        Add a new Working
                      </h5>
                    </div>
                    <form onSubmit={handleSubmitWorking} className='modal-body'>
                      <div className='form-group row'>
                        <div className='col-6'>
                          <small className='form-text text-muted'>
                            Date Working *
                          </small>
                          <input
                            className='form-control'
                            name='dateWorking'
                            type='date'
                            placeholder='Enter date'
                            onChange={handleChangeWorking}
                          />
                        </div>
                        <div className='col-6'>
                          <small className='form-text text-muted'>
                            Hour Working *
                          </small>
                          <input
                            className='form-control'
                            name='hourWorking'
                            type='text'
                            placeholder='Enter hour'
                            onChange={handleChangeWorking}
                          />
                        </div>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='submit'
                          className='btn btn-outline'
                          data-dismiss='modal'
                        >
                          CANCEL
                        </button>
                        <button type='submit' className='btn btn-outline'>
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <table className='table table-striped mt-3'>
                <thead>
                  <tr className='text-center'>
                    <th>No</th>
                    <th>Date</th>
                    <th>Hour</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>{renderWorkingTable()}</tbody>
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
                  <button
                    className='btn btn-outline mr-4 p-0 '
                    data-toggle='modal'
                    data-target='#exampleModal2'
                  >
                    <i className='fa-solid fa-circle-plus fa-lg'></i>
                  </button>
                </div>
              </div>
              <table className='table table-striped mt-3'>
                <thead>
                  <tr className='text-center'>
                    <th>No</th>
                    <th>Date</th>
                    <th>Money</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>{renderAdvanceList()}</tbody>
              </table>
              <div
                className='modal fade'
                id='exampleModal2'
                tabIndex={-1}
                role='dialog'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog' role='document'>
                  <div className='modal-content'>
                    <div className='modal-header bg-primary text-white'>
                      <h5 className='modal-title' id='exampleModalLabel'>
                        Add a new Advance
                      </h5>
                    </div>
                    <form onSubmit={handleSubmitAdvance} className='modal-body'>
                      <div className='form-group row'>
                        <div className='col-6'>
                          <small className='form-text text-muted'>
                            Date Advance *
                          </small>
                          <input
                            className='form-control'
                            name='dateAdvance'
                            type='date'
                            placeholder='Enter date'
                            onChange={handleChangeAdvance}
                          />
                        </div>
                        <div className='col-6'>
                          <small className='form-text text-muted'>
                            Money Advance *
                          </small>
                          <input
                            className='form-control'
                            name='moneyAdvance'
                            type='text'
                            placeholder='Enter money'
                            onChange={handleChangeAdvance}
                          />
                        </div>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='submit'
                          className='btn btn-outline'
                          data-dismiss='modal'
                        >
                          CANCEL
                        </button>
                        <button type='submit' className='btn btn-outline'>
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
                  <p>
                    Number of working days :
                    {employee.working === null ? ' 0' : workingList.length}
                  </p>
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
