import React from "react";
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Facebook from '../../../images/Social-logo/facebook.png';
import github from '../../../images/Social-logo/github.png';
import google from '../../../images/Social-logo/google.png';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from "react-router-dom";
import Loding from "../../Shared/Loding/Loding";


const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate =useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let errorElement;

  if(loading || loading1){
    return <Loding></Loding>
  }
  if (error || error1) {
    errorElement = (
      <div>
        <p>Error: {error?.message} {error1?.message}</p>
      </div>
    );
  }

  if(user || user1){
    navigate(from, { replace: true });
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div style={{ height: "1px" }} className="bg-primary w-25"></div>
        <p className="mt-2 px-2">Or</p>
        <div style={{ height: "1px" }} className="bg-primary w-25"></div>
      </div>
     <div >
     <button className="btn btn-primary btn-lg w-50 mb-2  d-block mx-auto">
         <img src={Facebook} alt="" />
         Google Sign In</button>
     <button onClick={() =>signInWithGithub()} className="btn btn-primary btn-lg w-50 mb-2 d-block mx-auto">
         <img src={github} alt="" />
         Google Sign In</button>
         {errorElement}
     <button onClick={() =>signInWithGoogle()} className="btn btn-primary btn-lg w-50 mb-2 d-block mx-auto">
         <img src={google} alt="" />
         Google Sign In</button>
     </div>
    </div>
  );
};

export default SocialLogin;
