import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
} from '../services/employee';
import './List.css';

const List = () => {
  const navigate = useNavigate();

  const { data: employeelist, isLoading, error } = useGetAllEmployeesQuery();
  const [deleteEmployeeMutation] = useDeleteEmployeeMutation();

  const employees = employeelist || [];

  const handleDelete = async (id) => {
    try {
      await deleteEmployeeMutation(id).unwrap();
      toast.success(`Employee ${id} deleted successfully!`);
    } catch (err) {
      toast.error(`Failed to delete employee ${id}: ${err?.data?.message || err.message}`);
    }
  };

  const handleEdit = (employee) => {
    navigate(`/employees/details`, {
      state: { employee, edit: true, profile: false, view: false },
    });
  };

  const handleAdd = () => {
    navigate(`/employees/details`, {
      state: { edit: false, profile: false, view: false, add: true },
    });
  };
  

  const faAlignCenter = {
    textAlign: 'center',
  };

  return (
    <div className="container mt-5">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) 
      // : error ? (
      //   <p className="text-danger">Error loading employees: {error.message}</p>
      // )
      
      : (
        <div>
          <h2 className="mb-4">Associate List</h2>
          <hr />
          <div className="mb-3 d-flex justify-content-end">
  <button className="btn btn-primary" onClick={() => handleAdd()}>
    ADD
  </button>
</div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Status</th>
                <th style={faAlignCenter}>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" style={faAlignCenter}>
                    No employees data.
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.status}</td>
                    <td style={faAlignCenter}>
                      <button
                        className="custom-button"
                        onClick={() =>
                          navigate(`/employees/details`, {
                            state: {
                              employee,
                              edit: false,
                              profile: false,
                              view: true,
                            },
                          })
                        }
                        style={{ marginRight: '10px' }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="custom-button"
                        onClick={() => handleEdit(employee)}
                        style={{ marginRight: '10px' }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="custom-button"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
