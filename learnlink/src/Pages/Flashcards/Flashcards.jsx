import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom'
import "./Flashcards.css";
import { DataContext } from "../dataContext.jsx";
import axios from "axios";

const Flashcards = () => {
  const [flashcards,setflashcards] = useState([]);
  const {documentId} = useParams();
  const {loader,setloader} = useContext(DataContext);

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < flashcards.length - 1) setIndex(index + 1);
  };
  const fetchFlashcard = async() => {
  try{
    setloader(true);
    const response = await axios.post(
        "http://localhost:4000/api/flashcards",{documentId}
      );
      if(response.data.success){
        setloader(false);
        setflashcards(response.data.data);
        
      }
  }
  catch(error){
    console.log(error);
  }
 }

 useEffect(()=>{
  fetchFlashcard();
 },[]);
  return (
    <div className="flashcard-page">
      <h1 className="flashcard-heading">Flashcards</h1>
      <div className="flashcard-container">
      <button className="nav-btn" onClick={handlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flashcard">
        <div className="question">
          {flashcards && flashcards[index]?.question}
        </div>

        <div className="answer">
          {flashcards && flashcards[index]?.answer}
        </div>
      </div>
      <button className="nav-btn" onClick={handleNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

    </div>
    </div>
    
  );
};

export default Flashcards;