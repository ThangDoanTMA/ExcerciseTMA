import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default function DetailEmployee(props) {
  const [employee, setEmployee] = useState({});
  const [teams, setTeams] = useState({});
  const employeeId = props.match.params.id;
  const [workingList, setWorkingList] = useState([]);
  const [advanceList, setAdvanceList] = useState([]);

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
  useEffect(() => {}, [workingList]);

  const renderWorkingTable = () => {
    // if (workingList !== null || workingList.length !== 0)
    if (employee.working !== null) {
      return workingList.map((data, index) => {
        return (
          <tr key={index}>
            <td scope='row'>{index + 1}</td>
            <td>{data.dateWorking}</td>
            <td>{data.hourWorking}</td>
            <td>
              <button
                className='btn btn-outline p-0 ml-3'
                onClick={() => {
                  const newWorkingList = workingList.splice(index, 1);
                  setEmployee(employee);
                  try {
                    const updateEmployees = async () => {
                      const res = await axios.put(
                        'http://localhost:8080/employee/update=' + employee.id,
                        employee,
                      );
                    };
                    updateEmployees();
                    setWorkingList(employee.working);
                    console.log('newWorkingList', newWorkingList);
                    console.log('employee.working', employee.working);
                    console.log('employee', employee);
                    // fetchData();
                  } catch (error) {
                    console.log(error.message);
                  }
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
          <td scope='row'></td>
          <td></td>
          <td></td>
          <td>
            {/* <button className='btn btn-outline p-0 ml-3'>
          <i className='fa-solid fa-trash-can fa-lg'></i>
        </button> */}
          </td>
        </tr>
      );
    }
  };

  const renderAdvanceList = () => {
    // if (advanceList !== null || advanceList.length !== 0)
    if (employee.advances !== null) {
      return advanceList.map((data, index) => {
        return (
          <tr key={index}>
            <td scope='row'>{index + 1}</td>
            <td>{data.dateAdvance}</td>
            <td>{data.moneyAdvance}$</td>
            <td>
              <button className='btn btn-outline p-0 ml-3'>
                <i className='fa-solid fa-trash-can fa-lg'></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td scope='row'></td>
          <td></td>
          <td></td>
          <td>
            {/* <button className='btn btn-outline p-0 ml-3'>
          <i className='fa-solid fa-trash-can fa-lg'></i>
        </button> */}
          </td>
        </tr>
      );
    }
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between mt-3'>
        <h4 className=''>{employee.name}</h4>
        <div>
          <button className='btn btn-outline mr-4 p-0'>
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
            src='https://i.pravatar.cc/150?img=12'
            alt='...'
            className='w-100 p-2'
          />
          <div
            // style={{ margin: '0 auto' }}
            className='d-flex justify-content-center'
          >
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
                        // value={employee.startDay}
                        readOnly
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
                        // value={employee.team}
                        readOnly
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
                        // value={employee.address}
                        readOnly
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
                        // value={employee.salaryPerHour}
                        readOnly
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
                <tbody>{renderAdvanceList()}</tbody>
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
                  <p>
                    Number of working days :
                    {employee.working === null ? '' : workingList.length}
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
