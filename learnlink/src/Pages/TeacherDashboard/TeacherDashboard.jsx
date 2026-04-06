import React from 'react'
import "./TeacherDashboard.css"
import Navbar from '../../components/Navbar/Navbar.jsx'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'


const TeacherDashboard = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const username = user?.firstName;
  return (
    <div className='teacher-dashboard'>
      <Navbar />
     <h1 className='teacher-dashboard-heading'>Welcome {username},</h1>
      <div className='teacher-features'>
        <div className='teacher-feature' onClick={()=>{
          navigate("/create-classroom")
        }} style={{backgroundColor:"orange"}} >
            <h2>Create Classroom</h2>
            <p>Teacher can create their own classrooms and assign courses here.</p>
        </div>
        <div className='teacher-feature' onClick={()=>{
          navigate("/classroom")}} style={{backgroundColor:"violet"}} >
            <h2>My Classroom</h2>
            <p>Teacher can view how many classes they are maintaining.</p>
        </div>
        <div className='teacher-feature' style={{backgroundColor:"green"}}  >
            <h2>My Documents</h2>
            <p>Teachers can manage their documents used for the courses here.</p>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
