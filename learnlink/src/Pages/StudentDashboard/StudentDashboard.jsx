import React, { useContext, useState } from 'react'
import { DataContext } from '../dataContext.jsx'
import loadersvg from "/src/assets/loader.svg"
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import "./Classroom.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const StudentDashboard = () => {

  const {loader,Classroom} = useContext(DataContext);
  const navigate = useNavigate();
  const [classList,setclassList] = useState([]);
  const [filteredClass,setfilteredClass] = useState(classList);

  const allClassroom  = async(id) => {
    try{
      const response = await axios.get(
        "http://localhost:4000/api/all"
      );
      if(response.data.success){
        setclassList(response.data.data);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  
  useEffect(()=>{
    allClassroom();
  },[]);



  return (
    <div>
       <Navbar/>
       {!loader ? <div>
          <h1 className='classroom-heading'>My Classroom</h1>
          <div>
            <input type='text'  />
          </div>
          <div className='classroom-list' > 
            {filteredClass?.map((item,index)=>(
              <div className='classroom-card' key={index}  >
                  <h1>{item.name}</h1>
                  <p>id:{item._id}</p>
                  <p><b>Mentor name:</b> {item.mentorName}</p>
                  <p><b>Course name:</b> {item.courseName}</p>
                  <p><b>Duration:</b> {item.courseDuration}</p>
                  <button onClick={()=>{navigate(`/documents/${item._id}`)}} style={{marginLeft:"10px"}} >View Documents</button>
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
