import React from 'react'
import logo from "/src/assets/learnlink.png"
import "./Navbar.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {isSignedIn,isLoaded,user} = useUser();

  useEffect(() => {

    if (!isLoaded || !isSignedIn) return;
    if(location.pathname !="/") return;

    const role = user?.publicMetadata?.role;


    if (role === "teacher") {
      navigate("/teacher-dashboard");
    }

    if (role === "student") {
      navigate("/student-dashboard");
    }

  }, [isLoaded, isSignedIn, user,navigate]);
  
  return (
    <div className='nav-bar'>
      <img src={logo} className='logo' />
      { !isSignedIn ?  <div className='sign-in-up-button'>
        <button className='sign-up-button' onClick={()=>{navigate("/signup")}} >Get Started</button>
        <button className='sign-in-button' onClick={()=>{navigate("/signin")}}>Login</button>
      </div> : <UserButton /> }
      
    </div>
  )
}

export default Navbar
