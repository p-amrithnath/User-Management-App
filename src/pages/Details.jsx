import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Backbutton from "../components/Backbutton";
import { editEmployee } from "../redux/features/employeesSlice";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    employee,
    profile = false,
    view = false,
    edit = false,
  } = location.state || {};
  console.log("state:", location.state);

  useEffect(() => {
    if (employee) {
      setEmployeeDetails(employee);
      setIsEditing(edit);
    }
  }, [employee, edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(editEmployee(employeeDetails));
    setIsEditing(false);
    toast.success("Employee details updated successfully!");
    navigate("/employees");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmployeeDetails(employee);
    navigate("/employees");
  };

  const header = profile ? "Profile" : "Associate Details";

  return (
    <>
      <Backbutton />
      <div className="container mt-3">
        <h2 className="mb-4">{header}</h2>
        <hr />
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="id">Associate ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  value={employeeDetails.id || ""}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={employeeDetails.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="i-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={employeeDetails.email || ""}
                    onClick={() =>
                      (window.location.href = `mailto:${employeeDetails.email}`)
                    }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {!profile && (
                    <a
                      href={`mailto:${employeeDetails.email}`}
                      className="btn btn-outline-secondary"
                    >
                      <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={employeeDetails.gender || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={employeeDetails.status || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="row mt-3">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Details;
