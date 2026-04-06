import React, { useEffect } from 'react'
import { SignIn, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const {user,isLoaded,isSignedIn} = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoaded || !isSignedIn){
      return;
    }
    const role = user?.publicMetadata?.role;
    
    if(!role){
      navigate("/role");
    }

    if(role==="student"){
      navigate("/student-dashboard");
    }
    if(role==="teacher"){
      navigate("/teacher-dashboard");
    }
  },[isLoaded,isSignedIn,user])

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <SignIn signUpUrl='/signup' afterSignOutUrl="/" />
    </div>
  )
}

export default SignInPage
