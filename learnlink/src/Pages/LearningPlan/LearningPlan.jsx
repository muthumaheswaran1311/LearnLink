import React from 'react'
import { useState,useContext,useEffect } from 'react';
import { DataContext } from "../dataContext.jsx";
import { useParams } from 'react-router-dom';
import "./LearningPlan.css";
import axios from "axios"


const LearningPlan = () => {
    const [learningPlan,setlearningPlan] = useState([]);
      const {documentId} = useParams();
      const {loader,setloader} = useContext(DataContext);
      const fetchLearningPlan = async() => {
  try{
    setloader(true);
    const response = await axios.post(
        "http://localhost:4000/api/learningplan",{documentId}
      );
      if(response.data.success){
        setloader(false);
        setlearningPlan(response.data.data);
        
      }
  }
  catch(error){
    console.log(error);
  }
 }

 useEffect(()=>{
   fetchLearningPlan();
  },[]);
       
  return (

    <div className="learning-plan-page">

      <div className="learning-plan-header">
        <p>YOUR LEARNING JOURNEY</p>

        <h1>Learning Plan</h1>

        <span>
          Follow this step-by-step plan to understand the concepts
          from the document.
        </span>
      </div>

      <div className="learning-plan-container">

        {learningPlan.map((item) => (

          <div className="learning-step" key={item.step}>

            <div className="step-number">
              {item.step}
            </div>

            <div className="step-card">

              <span className="step-label">
                STEP {item.step}
              </span>

              <h2>{item.topic}</h2>

              <div className="plan-section">
                <h3>Objective</h3>

                <p>
                  {item.objective}
                </p>
              </div>

              <div className="plan-section">
                <h3>Activity</h3>

                <p>
                  {item.activity}
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default LearningPlan
