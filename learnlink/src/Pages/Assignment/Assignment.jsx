import React, { useContext, useEffect, useState } from "react";
import "./Assignment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { DataContext } from "../dataContext.jsx";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Assignment = () => {
  const [quiz,setquiz] = useState([]);
  const {documentId} = useParams();
  const {loader,setloader} = useContext(DataContext);
  const {getToken} = useAuth();

  const updateLastScore = async () => {
      try {
        const total = quiz.length;
  
      
  
        const token = await getToken();
  
        const response = await axios.post(
          "http://localhost:4000/api/updatescore",
          { score ,total},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log(token);
  
        if (response.data.success) {
           toast.success(`You passed! Score: ${score}/${total} 🎉`);
        }

        if (score < total / 2) {
      toast.error("Marks not enough 😢");
    } 
  
      } catch (error) {
        console.log(error);
      }
    };
  

  const fetchAssignment = async() => {
  try{
    setloader(true);
    const response = await axios.post(
        "http://localhost:4000/api/assignment",{documentId}
      );
      if(response.data.success){
        setloader(false);
        setquiz(response.data.data);
        
      }
  }
  catch(error){
    console.log(error);
  }
 }

 useEffect(()=>{
  fetchAssignment();
 },[]);


  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleSelect = (qIndex, optionIndex) => {
    const prevSelected = selectedAnswers[qIndex];

    // If same option clicked → deselect
    if (prevSelected === optionIndex) {
      if (optionIndex === quiz[qIndex].correctAnswer) {
        setScore(score - 1);
      }

      const updated = { ...selectedAnswers };
      delete updated[qIndex];
      setSelectedAnswers(updated);
      return;
    }

    // If previously selected was correct → remove score
    if (prevSelected === quiz[qIndex].correctAnswer) {
      setScore(score - 1);
    }

    // If new selection is correct → add score
    if (optionIndex === quiz[qIndex].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    const total = quiz.length;

    if (score < total / 2) {
      toast.error("Marks not enough 😢");
    } else {
      toast.success(`You passed! Score: ${score}/${total} 🎉`);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      {quiz.length>0 && quiz?.map((q, qIndex) => (
        <div key={qIndex} className="question-card">
          <h3>{q.question}</h3>

          {q.options?.map((opt, optIndex) => (
            <div
              key={optIndex}
              className={`option ${
                selectedAnswers[qIndex] === optIndex ? "selected" : ""
              }`}
              onClick={() => handleSelect(qIndex, optIndex)}
            >
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={updateLastScore}>
        Submit
      </button>
      <ToastContainer />
      
    </div>
  );
};

export default Assignment;