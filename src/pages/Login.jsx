import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation,useGetEmployeeByIdQuery } from "../services/employee"; // Use the login mutation

function Login() {
  const [userName, setUserName] = useState("");
  const [id,setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation(); // Use login mutation
  const { data: employeeData } = useGetEmployeeByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target.elements.form1.value;
    const password = e.target.elements.form2.value;

    setUserName(userName);
    setPassword(password);

    if (userName && password) {
      try {
        const response = await login({ userName, password }).unwrap(); // Call login API
        const userId = response.userId;
        setId(userId); // Set the ID from the response
        localStorage.setItem("jwtToken", response.token); // Store token in localStorage
        toast.success("Login Successfully!");
        navigate("/employees"); // Navigate to employees page
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Invalid credentials. Please try again.");
      }
    } else {
      toast.error("Please enter valid login details.");
    }
  };

  return (
    <MDBContainer fluid className="p-4 mt-5">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Streamline <br />
            <span className="text-primary">Your Workforce</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Simplify your user management process. Our system offers powerful
            tools to help you organize and support your team, ensuring everyone
            stays connected and productive.
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <h4 className="d-flex justify-content-center mb-4 fw-bold">
                User Management System
              </h4>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Associate Name"
                  id="form1"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password" // Use type="password" for security
                />
                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  type="submit"
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? "Logging in..." : "Login"}
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;