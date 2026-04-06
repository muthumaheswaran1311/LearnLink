import React, { useContext, useState } from 'react'
import "./Assistant.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from '../dataContext.jsx';
import loadersvg from "/src/assets/loader.svg"
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Assistant = () => {
  const {documentId} = useParams();
  const [answer,setanswer] = useState("No response still");
  const {loader,setloader} = useContext(DataContext);
  const [input,setinput] = useState("");

  const copy = () => {
    navigator.clipboard.writeText(answer);
    toast.success("Copied");
  }

  const getResponse = async() => {
    try{ 
    setloader(true);
      const response = await axios.post(
            "http://localhost:4000/api/assistant",
            {documentId,input}
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
 
  return (
    <div className='assistant-page'>
      <div className='assistant-section'>
        <h1 className='ai-assistant-heading'>AI Assistant</h1>
      <p className='ai-assistant-notice'>You can ask question about the document and the AI assistant will reply.Note:Copy the results as soon as possible,they are not saved to see later.</p>
      <div className='input-tag'>
        <input type='text' className='input'onChange={(e)=>setinput(e.target.value)} placeholder='Ask Something'  />
        <FontAwesomeIcon icon={faArrowRight} className='arrow-icon' onClick={getResponse} />
      </div>
      </div>
      <div className='response-section'>{
        !loader ? <p className={answer==="No response still" ? "no-response" : "response"} >{answer}</p> : <img src={loadersvg} className="loader" />
        }
        { answer!= "No response still" && <button className='ai-assistant-copy' onClick={copy}>Copy</button>}
        </div>
        <ToastContainer />
    </div>
  )
}

export default Assistant
