import React, { useEffect, useState,useContext } from "react";
import "./Important.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../dataContext.jsx";

const Important = () => {
  const [importantQuestions,setimportantQuestions] = useState([]);
  const {documentId} = useParams();
   const {loader,setloader} = useContext(DataContext);

  const fetchImportant = async() => {
  try{
    setloader(true);
    const response = await axios.post(
        "http://localhost:4000/api/imp",{documentId}
      );
      if(response.data.success){
        setloader(false);
        setimportantQuestions(response.data.data);
        
      }
  }
  catch(error){
    console.log(error);
  }
 }
 useEffect(()=>{
  fetchImportant();
 },[]);

  return (
    <div className="important-container">
      <h1 className="heading">Important Questions</h1>

      <div className="questions-list">
        {importantQuestions.map((item, index) => (
          <div className="question-card" key={index}>
            <span className="question-number">{index + 1}</span>
            <p className="question-text">{item.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Important;