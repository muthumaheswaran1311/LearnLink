import React from 'react'
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='home-page'>
        <h1>
          <span>Learn Link</span>, The only place where learning make simple
        </h1>
       <p>Upload your documents to instantly generate quizzes and assignments.
          Learn, practice, and earn certificates all in one platform.</p>
      </div>
    </div>
  )
}

export default Home
