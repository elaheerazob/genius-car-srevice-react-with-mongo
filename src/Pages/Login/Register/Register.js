import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loding from "../../Shared/Loding/Loding";

const Register = () => {
  const [createUserWithEmailAndPassword, user,loading] =
    useCreateUserWithEmailAndPassword(auth ,{sendEmailVerification :true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [agree,setAgree] =useState(false);
  if(loading || updating){
    return <Loding></Loding>
  }
  const navigetLogin = () => {
    navigate("/login");
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName :name });
    console.log('Updated profile');
    navigate("/home");
    
    
  };
  return (
    <div>
      <h2 className="text-center text-primary">Register Now</h2>
      <Form onSubmit={handelSubmit} className="w-50 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter Your Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onClick={() =>setAgree(!agree)} type="checkbox" className={agree ? 'text-primary' : 'text-danger'} label="Terms and Conditions" />
        </Form.Group>
        <Button disabled={!agree} variant="primary" type="submit">
          Submit
        </Button>
        <p>
          Already Have a Account !!! ?
          <Link
            to="/login"
            className="text-danger pe-auto"
            onClick={navigetLogin}
          >
            Login Now !
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
