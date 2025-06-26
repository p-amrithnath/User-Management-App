import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Backbutton from "../components/Backbutton";
import { toast } from "react-toastify";
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../services/employee";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    employee,
    profile = false,
    view = false,
    edit = false,
    add = false,
  } = location.state || {};

  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [addEmployeeMutation] = useAddEmployeeMutation();
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (employee) {
      setEmployeeDetails(employee);
      setIsEditing(edit);
    } else if (add) {
      setEmployeeDetails({
        id: "",
        name: "",
        email: "",
        gender: "",
        status: "",
        password: "",
      });
      setIsEditing(true);
    }
  }, [employee, edit, add]);

  const validateFields = () => {
    const { id, name, email, gender, status, password } = employeeDetails;
  
    if ((edit && !id) || !name || !email || !gender || !status || (add && !password)) {
      toast.error("Please fill in all required fields.");
      return false;
    }
  
    return true;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!validateFields()) {
        return; // Exit if validation fails
      }
      if (add) {
        console.log("Adding new employee:", employeeDetails);
        const response = await addEmployeeMutation(employeeDetails).unwrap();
        toast.success("Employee added successfully!");
        console.log("Add Employee Response:", response);
      } else {
        const response = await updateEmployeeMutation({
          id: employeeDetails.id,
          updatedEmployee: employeeDetails,
        }).unwrap();
        console.log("Update Employee Response:", response);
        toast.success("Employee details updated successfully!");
      }
      setIsEditing(false);
      navigate("/employees");
    } catch (err) {
      console.error("Error during save:", err);

      // Handle parsing error with non-JSON response
      if (err.status === "PARSING_ERROR" && err.data) {
        toast.info(err.data); // Show the message from the server
        navigate("/employees");
      } else {
        toast.error(
          `Failed to save employee: ${err?.data?.message || err.message}`
        );
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmployeeDetails(employee || {});
    navigate("/employees");
  };

  const header = profile
    ? "Profile"
    : add
    ? "Add New Associate"
    : "Associate Details";

  return (
    <>
      <Backbutton />
      <div className="container mt-3">
        <h2 className="mb-4">{header}</h2>
        <hr />
        <form>
          <div className="row">
            {!add && (
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="id">Associate ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={employeeDetails.id || ""}
                    onChange={handleChange}
                    disabled={true} 
                  />
                </div>
              </div>
            )}
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
            {add && (
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="id">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={employeeDetails.password || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
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
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {!profile && !isEditing && (
                    <a
                      // href={`mailto:${employeeDetails.email}`}
                      onClick={() => {
                        window.location.href = `mailto:${employeeDetails.email}`;
                      }}
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
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={employeeDetails.gender || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={employeeDetails.status || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
