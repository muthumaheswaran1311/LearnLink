import React, { useContext } from 'react'
import { DataContext } from '../dataContext.jsx'
import loadersvg from "/src/assets/loader.svg"
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import "./Classroom.css"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const Classroom = () => {

  const {loader,fetchClassroom,Classroom} = useContext(DataContext);
  const navigate = useNavigate();

  const deleteClassroom  = async(id) => {
    try{
      const response = await axios.post(
        "http://localhost:4000/api/delete-class",{id}
      );
      if(response.data.success){
        toast.success(response.data.message);
        fetchClassroom();
      }
    }
    catch(error){
      console.log(error);
    }
  }
  
  useEffect(()=>{
    fetchClassroom();
  },[]);



  return (
    <div>
       <Navbar/>
       {!loader ? <div>
          <h1 className='classroom-heading'>My Classroom</h1>
          <div className='classroom-list' > 
            {Classroom?.map((item,index)=>(
              <div className='classroom-card' key={index}  >
                  <h1>{item.name}</h1>
                  <p>id:{item._id}</p>
                  <p><b>Mentor name:</b> {item.mentorName}</p>
                  <p><b>Course name:</b> {item.courseName}</p>
                  <p><b>Duration:</b> {item.courseDuration}</p>
                  <button onClick={()=>deleteClassroom(item._id)} >Delete</button>
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

export default Classroom
