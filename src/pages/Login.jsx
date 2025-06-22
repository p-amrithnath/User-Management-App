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
import { useGetEmployeeByIdQuery } from "../services/employee";

function Login() {
  const [associateId, setAssociateId] = useState("");
  const navigate = useNavigate();
  const {
    data: profile,
    error: profileError,
    isLoading,
  } = useGetEmployeeByIdQuery(associateId, {
    skip: !associateId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.elements.form1.value;
    setAssociateId(id);

    if (id) {
      if (isLoading) {
        toast.info("Loading...");
      } else if (profile) {
        navigate("/employees");
        toast.success("Login Successfully!");
      } else if (profileError) {
        console.error("Error fetching data:", profileError);
        toast.error("Associate ID not found");
      }
    } else {
      toast.error("Please enter a valid Associate ID");
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
                  label="Associate ID"
                  id="form1"
                  type="text"
                />
                <MDBBtn className="w-100 mb-4" size="md" type="submit">
                  Login
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
