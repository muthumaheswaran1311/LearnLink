import React from 'react'
import Home from './Pages/Home/Home.jsx'
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard.jsx';
import TeacherDashboard from './Pages/TeacherDashboard/TeacherDashboard.jsx';
import Classroom from './Pages/Classroom/Classroom.jsx'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Role from './Pages/Role/Role.jsx';
import SignUpPage from './Pages/SignUp/SignUpPage.jsx';
import SignInPage from './Pages/SignIn/SignInPage.jsx';
import CreateClassroom from './Pages/createClassroom/createClassroom.jsx';
import Documents from './Pages/Documents/Documents.jsx';
import ContentDashboard from './Pages/ContentDashboard/ContentDashboard.jsx';
import Flashcards from './Pages/Flashcards/Flashcards.jsx';
import Assignment from './Pages/Assignment/Assignment.jsx';
import Important from './Pages/Important/Important.jsx';
import Assistant from './Pages/Assistant/Assistant.jsx';
import Evaluator from './Pages/Evaluator/Evaluator.jsx';
import StudentDocument from  './Pages/StudentDocument/StudentDocument.jsx';
import LearningPlan from './Pages/LearningPlan/LearningPlan.jsx';



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/signin' element={<SignInPage/>} />
          <Route path='/teacher-dashboard' element={<TeacherDashboard/>} />
          <Route path='/student-dashboard' element={<StudentDashboard/>} />
          <Route path='/classroom' element={<Classroom/>} />
          <Route path='/role' element={<Role/>} />
          <Route path='/create-classroom' element={<CreateClassroom/>} />
          <Route path='/documents/:id' element={<Documents/>} />
          <Route path='/content/:documentId' element={<ContentDashboard/>} />
          <Route path='/content/flashcard/:documentId' element={<Flashcards/>} />
          <Route path='/content/assignment/:documentId' element={<Assignment/>} />
          <Route path='/content/important/:documentId' element={<Important/>} />
          <Route path='/content/assistant/:documentId' element={<Assistant/>} />
          <Route path='/content/evaluator/:documentId' element={<Evaluator/>} />
          <Route path='/content/learningplan/:documentId' element={<LearningPlan/>} />
          <Route path='/stud-documents/:id' element={<StudentDocument/>} />
          
          
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
