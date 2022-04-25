import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { EMPLOYEE_PER_PAGE } from '../../utils/constants';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';

export default function EmployeeComponent() {
  const [employees, SetEmployees] = useState([]);
  const [teams, SetTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(EMPLOYEE_PER_PAGE);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [employee, setEmployee] = useState({});
  const [search, setSearch] = useState('');
  const defaultSexOption = 'Male';
  const [checkedState, setCheckedState] = useState(
    new Array(employees.length).fill(false),
  );

  const fetchData = async () => {
    try {
      const res = await Promise.all([
        axios.get('http://localhost:8080/employee/list'),
        axios.get('http://localhost:8080/team/list'),
      ]);
      const employees = res[0].data;
      const teams = res[1].data;
      await employees.forEach((employee) => {
        for (let i = 0; i < teams.length; i++) {
          if (employee.idTeam === teams[i].id) {
            employee.team = teams[i].teamName;
            employee.selected = false;
          }
        }
      });
      await SetEmployees(employees);
      await SetTeams(teams);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [employees]);

  /*-----------------------HANDLE FORM INPUT------------------------------------------------ */

  const handleChangeInput = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
      working: [],
      advances: [],
      avatar: 'defaultImg.jpg',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const addEmployee = async () => {
        const res = await axios.post(
          'http://localhost:8080/employee/create',
          employee,
        );
      };
      addEmployee();
      swal({
        title: 'Good job!',
        text: 'Created a new employee!',
        icon: 'success',
        button: 'Yahoooo!',
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  /*------------------------------------------------------------------------------------ */

  /*-----------------------HANDLE SEARCH------------------------------------------------ */

  const filterEmployees = employees.filter((item) => {
    return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  /*------------------------------------------------------------------------------------ */

  /*---------------------HANDLE PAGINATION------------------------------------------------ */

  const handleClickPagination = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(employees.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumber = pages.map((num, index) => {
    if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
      return (
        <button
          className={
            currentPage === num
              ? 'active btn btn-outline-primary ml-2'
              : 'btn btn-outline-primary ml-2'
          }
          key={index}
          id={num}
          onClick={handleClickPagination}
        >
          {num}
        </button>
      );
    } else {
      return null;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterEmployees.slice(indexOfFistItem, indexOfLastItem);

  const handleNextPagination = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlPrevPagination = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button
        className='btn btn-outline-primary mr-2 ml-2'
        onClick={handleNextPagination}
      >
        &hellip;
      </button>
    );
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button
        className='btn btn-outline-primary ml-2 mr-2'
        onClick={handleNextPagination}
      >
        &hellip;
      </button>
    );
  }
  /*------------------------------------------------------------------------- */

  const handleDeleteList = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        employees.forEach((employee) => {
          if (employee.selected) {
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
          }
        });
        const remainEmployees = employees.filter(
          (remainEmployee) => remainEmployee.selected === false,
        );
        SetEmployees(remainEmployees);
      } else {
        swal('Your data is safe!');
      }
    });
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
          <button
            className='btn btn-outline p-0 mr-3'
            onClick={handleDeleteList}
          >
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
                disabled
              >
                <SearchOutlined />
              </button>
            </div>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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
              <input
                type='checkbox'
                onChange={(e) => {
                  let checked = e.target.checked;
                  SetEmployees(
                    employees.map((data) => {
                      data.selected = checked;
                      return data;
                    }),
                  );
                }}
              />
            </th>
            <th>No</th>
            <th>FullName</th>
            <th>Phone</th>
            <th>Team</th>
            <th className='text-center'>Option</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    onChange={(event) => {
                      let checked = event.target.checked;
                      SetEmployees(
                        employees.map((data) => {
                          if (employee.id === data.id) {
                            data.selected = checked;
                          }
                          return data;
                        }),
                      );
                    }}
                    type='checkbox'
                    checked={employee.selected}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.team ? employee.team : 'Not belong any team'}</td>
                <td className='text-center'>
                  <NavLink
                    exact
                    to={'/detailemployee/' + employee.id}
                    className='mr-4'
                  >
                    <i className='fa-solid fa-info'></i>
                  </NavLink>
                  <button
                    className='btn btn-outline p-0'
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
                                'http://localhost:8080/employee/delete=' +
                                  employee.id,
                              );
                              const remainEmployees = employees.filter(
                                (remainEmployee) =>
                                  remainEmployee.id !== employee.id,
                              );
                              SetEmployees(remainEmployees);
                            };
                            deleteEmployee();
                          } catch (error) {
                            console.log(error.message);
                          }
                          swal('This employee has been deleted!', {
                            icon: 'success',
                          });
                        } else {
                          swal('Your data is safe!');
                        }
                      });
                    }}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
              <h5 className='modal-title'>Add a new Employee</h5>
            </div>
            <form onSubmit={handleSubmit} className='modal-body'>
              <div className='form-group'>
                <small className='form-text text-muted'>
                  Full name employee *
                </small>
                <input
                  className='form-control'
                  name='name'
                  required
                  type='text'
                  placeholder='Enter full name'
                  onChange={handleChangeInput}
                />
              </div>
              <div className='form-group '>
                <small className='form-text text-muted'>Address *</small>
                <input
                  required
                  className='form-control'
                  name='address'
                  type='text'
                  placeholder='Enter address'
                  onChange={handleChangeInput}
                />
              </div>
              <div className='form-group row'>
                <div className='col-6'>
                  <small className='form-text text-muted'>Team *</small>
                  <div className='form-group'>
                    <select
                      className='form-control'
                      name='idTeam'
                      required
                      onChange={handleChangeInput}
                    >
                      {teams.map((team) => {
                        return (
                          <option key={team.id} value={team.id}>
                            {team.teamName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className='col-6'>
                  <small className='form-text text-muted'>Sex employee *</small>
                  <div className='form-group'>
                    <select
                      required
                      className='form-control'
                      name='sex'
                      onChange={handleChangeInput}
                      defaultValue={defaultSexOption}
                    >
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
                    required
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
                      required
                      type='date'
                      name='startDay'
                      className='form-control'
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-6'>
                  <small className='form-text text-muted'>Money/hour *</small>
                  <input
                    required
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
                    required
                    className='form-control'
                    name='phoneNumber'
                    type='text'
                    placeholder='Enter phone number'
                    onChange={handleChangeInput}
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
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{ float: 'right' }}>
        <button
          className='btn btn-outline-primary '
          onClick={handlPrevPagination}
          disabled={currentPage === pages[0] ? true : false}
        >
          Prev
        </button>
        {pageDecrementBtn}
        {renderPageNumber}
        {pageIncrementBtn}
        <button
          className='btn btn-outline-primary ml-2'
          onClick={handleNextPagination}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
}
