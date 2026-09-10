import React, { useContext, useState } from 'react'
import { DataContext } from '../dataContext.jsx'
import loadersvg from "/src/assets/loader.svg"
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import "./StudentDashboard.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const StudentDashboard = () => {

  const {loader,Classroom,sselectedclass,allClassroom,classList} = useContext(DataContext);
  const navigate = useNavigate();
  const [search,setsearch] = useState("");
  const [filteredClass,setfilteredClass] = useState(classList);
 
  
  useEffect(()=>{
    allClassroom();
     if(search){
    setfilteredClass(classList.filter((item)=>(item._id.includes(search))));
  }
  else{
    setfilteredClass(classList);
  }
  },[search,classList]);



  return (
    <div>
       <Navbar/>
       {!loader ? <div>
          <h1 className='classroom-heading'>Classrooms</h1>
          <div className='input-tag'>
            <label>Enter Classroom Id:</label>
            <input type='text' onChange={(e)=>{setsearch(e.target.value);}} />
          </div>
          <div className='classroom-list' > 
            {filteredClass?.map((item,index)=>(
              <div className='classroom-card' key={index}  >
                  <h1>{item.name}</h1>
                  <p>id:{item._id}</p>
                  <p><b>Mentor name:</b> {item.mentorName}</p>
                  <p><b>Course name:</b> {item.courseName}</p>
                  <p><b>Duration:</b> {item.courseDuration}</p>
                  <button onClick={()=>{navigate(`/stud-documents/${item._id}`)}} style={{marginLeft:"10px"}} >View Documents</button>
              </div>
            ))}
          </div>
      </div> : 
       <img src={loadersvg} className='loader' />
      }
      <ToastContainer/>  
    </div>
  )
}

export default StudentDashboard
