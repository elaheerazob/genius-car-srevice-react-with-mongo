import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loding from "../../Shared/Loding/Loding";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] =
    useSendPasswordResetEmail(auth);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let errorElement;

  if(loading || sending){
    return <Loding></Loding>
  }
  if (error) {
    errorElement = (
      <div>
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  if (user) {
    // navigate(from, { replace: true });
  }
  const handelSubmit =async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(email, password);
    const {data} =await axios.post('http://localhost:5000/login', {email});
    localStorage.setItem('accessToken',data.accessToken);
    navigate(from, { replace: true });
  };
  const navigetRegister = () => {
    navigate("/register");
  };
  const restPassword = async  () =>{
    const email = emailRef.current.value;
    if(email){
      await sendPasswordResetEmail(email);
      toast('Sent mail');
    }else{
      toast('Pls Enter Your Email');
    }
  }
  return (
    <div>
      <h2 className="text-center text-primary">Login Now</h2>
      <Form onSubmit={handelSubmit} className="w-50 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>
          New to Genius Car?
          <Link to="/register"className="text-danger pe-auto text-decoration-none"onClick={navigetRegister}> Please Register</Link>
        </p>
        <p>
          Forgat Your Password
          <Button variant="link"  className="text-danger pe-auto text-decoration-none"onClick={restPassword}> Reset Now </Button>
        </p>
      </Form>
      {errorElement}
      <SocialLogin></SocialLogin>
      <ToastContainer />
    </div>
  );
};

export default Login;
