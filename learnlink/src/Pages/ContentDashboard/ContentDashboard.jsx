import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import { useUser } from '@clerk/clerk-react'
import "./ContentDashboard.css"

const ContentDashboard = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const username = user?.firstName;
  const {documentId} = useParams();

  return (
    <div className='content-dashboard'>
      <Navbar />
     <h1 className='content-dashboard-heading'>Welcome {username},</h1>
      <div className='content-features'>
        <div className='content-feature' onClick={()=>{
          navigate(`/content/flashcard/${documentId}`)
        }} style={{backgroundColor:"orange"}} >
            <h2>Flashcards</h2>
            <p>A set of flashcards which are related to the document is available here.</p>
        </div>
        <div className='content-feature' onClick={()=>{
          navigate(`/content/assignment/${documentId}`)}} style={{backgroundColor:"violet"}} >
            <h2>Quiz</h2>
            <p>Students can solve the AI generated quiz and practice themselves.</p>
        </div>
        <div className='content-feature' style={{backgroundColor:"green"}} onClick={()=>{navigate(`/content/important/${documentId}`)}} >
            <h2>Important Questions</h2>
            <p>Document is completely analyzed and the important questions are here.</p>
        </div>
        <div className='content-feature' style={{backgroundColor:"red"}} onClick={()=>{navigate(`/content/assistant/${documentId}`)}} >
            <h2>AI Assistant</h2>
            <p>Students can ask any doubt about the documents here.</p>
        </div>
        <div className='content-feature' style={{backgroundColor:"purple"}} onClick={()=>{navigate(`/content/evaluator/${documentId}`)}} >
            <h2>AI Evaluator</h2>
            <p>Teachers can evaluate the answers they have.</p>
        </div>
      </div>
    </div>
  )
}

export default ContentDashboard
