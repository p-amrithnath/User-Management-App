import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "../redux/features/employeesSlice";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
  const { employees, loading, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    toast.success(`Employee ${id} deleted successfully!`);
  };

  const handleEdit = (employee) => {
    navigate(`/employees/details`, {
      state: { employee, edit: true, profile: false, view: false },
    });
  };

  const faAlignCenter = {
    textAlign: "center",
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <h2 className="mb-4">Associate List</h2>
          <hr />
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
              {!employees || employees.length === 0 ? (
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
                        style={{ marginRight: "10px" }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="custom-button"
                        onClick={() => handleEdit(employee)}
                        style={{ marginRight: "10px" }}
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
