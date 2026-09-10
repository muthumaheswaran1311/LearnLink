import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./StudentDocument.css"
import loadersvg from "/src/assets/loader.svg"
import Navbar from '../../components/Navbar/Navbar.jsx'
import Upload from '../../components/Upload/Upload.jsx'
import { DataContext } from '../dataContext.jsx'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

const Documents = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const {showupload,setshowupload,classList,loader,allClassroom} = useContext(DataContext);
  const [documents, setDocuments] = useState([]);

  
  useEffect(() => {
    allClassroom();
  }, []);

  useEffect(() => {
    if (classList?.length > 0) {
      const selectedClass = classList.find(
        (cls) => cls._id === id
      );

      if (selectedClass) {
        setDocuments(selectedClass.documents);
      }
    }
  }, [classList, id]);
  return (
    <div>
      <Navbar/>
      { showupload && <Upload id={id} />}

      <h1 className='classroom-heading'>Documents</h1>
      {!loader ? (
        <div style={{ padding: "20px" }}>
          <div className='document-list'>
            {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div onClick={()=>navigate(`/content/${doc.documentId}`)}
                key={index}
                className='document-card'
              >
                <h2>{doc.name}</h2>
                <p>{doc.description}</p>
              </div>
            ))
          ) : (
            <p className='choice'>No documents found</p>
          )}
          </div>
          
        </div>
      ) : (
        <img src={loadersvg} className="loader" />
      )}
      
      <ToastContainer /> 
    </div>
  )
}

export default Documents
