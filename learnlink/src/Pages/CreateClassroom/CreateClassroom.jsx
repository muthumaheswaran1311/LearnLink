import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./CreateClassroom.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import loadersvg from "/src/assets/loader.svg"
import { useContext } from 'react';
import { DataContext } from '../dataContext.jsx';

const CreateClassroom = () => {
  const[Classroom,setClassroom] = useState({
    name:"",
    mentorName : "",
    courseName : "",
    courseDuration : ""
  });
  const {loader,setloader} = useContext(DataContext);
  const navigate = useNavigate();
  const { getToken } = useAuth(); 
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setClassroom({...Classroom,[name]:value});
  }

  const sendClassRoom = async() => {
    try{
      const token = await getToken();
      setloader(true);
      const response = await axios.post(
        "http://localhost:4000/api/create-classroom",
         Classroom ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.success){
        setloader(false);
        navigate("/classroom")
      }
      
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar/>
      { !loader ? <div>
        <h1 className='create-classroom-heading'>Classroom creation</h1>
      <div className='input-sections'>
        <div className='input-section' >
            <label >Enter Classroom Name</label>
            <input type='text' className='input-tag' name='name' onChange={inputHandler} />
        </div>
        <div className='input-section'>
            <label >Enter Mentor Name</label>
            <input type='text' className='input-tag' name='mentorName' onChange={inputHandler} />
        </div>
        <div className='input-section'>
            <label >Enter Course Name</label>
            <input type='text' className='input-tag' name='courseName'  onChange={inputHandler} />
        </div>
        <div className='input-section'>
            <label >Enter Course Duration</label>
            <input type='text' className='input-tag' name='courseDuration' onChange={inputHandler} />
        </div>
        <button className='create-button-heading' onClick={sendClassRoom}>Submit</button>
      </div>
      </div> :
      <img src={loadersvg} className='loader' />} 
    </div>
  )
}

export default CreateClassroom
