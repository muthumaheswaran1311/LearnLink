import React, { useContext, useState } from 'react'
import "./Evaluator.css"
import { DataContext } from '../dataContext.jsx'
import Tesseract from "tesseract.js";
import loadersvg from "/src/assets/loader.svg"
import { useParams } from 'react-router-dom';
import axios from "axios"
const Evaluator = () => {

  const {loader,setloader} = useContext(DataContext);
  const [answer,setanswer] = useState("No response still");
  const [text,setText] = useState("");
  const [mode,setmode] = useState("");
  const {documentId} = useParams();

  const getMarks = async()=> {
        try{ 
    setloader(true);
      const response = await axios.post(
            "http://localhost:4000/api/evaluator",
            {documentId,text,mode}
          );
          if(response.data.success){
            setloader(false);
            setanswer(response.data.data);
            
          }
      }
      catch(error){
        console.log(error);
      }
  }



   const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    

    try {
      const results = await Promise.all(
        files.map(file =>
          Tesseract.recognize(file, "eng", {
            logger: m => console.log(m),
          })
        )
      );

      const combinedText = results
        .map(res => res.data.text)
        .join("\n\n");

      setText(combinedText);
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className='evaluator-section'>
      <h1 className='evaluator-heading'>AI Evaluator</h1>
      <p className='evaluator-description'>Upload your images below and evaluate your answers</p>
      <div className='evaluate-input'>
        <input type='file' id='file' hidden multiple onChange={handleImages} /> 
        <label htmlFor='file' className='file-label'>Choose image</label>
        <div className='mode'>
            <span onClick={()=>setmode("easy")} className={mode === "easy" ? "selected":"not-selected"}>Easy</span>
            <span onClick={()=>setmode("medium")} className={mode === "medium" ? "selected":"not-selected"} >Medium</span>
            <span onClick={()=>setmode("hard")} className={mode === "hard" ? "selected":"not-selected"} >Hard</span>
        </div>
        <button className='evaluation-button' onClick={getMarks} >Get marks</button>
      </div>
      <div className='response-section'>{
              !loader ? <p className={answer==="No response still" ? "no-response" : "response"} >{answer}</p> : <img src={loadersvg} className="loader" />
              }
     </div>
    </div>
  )
}

export default Evaluator
