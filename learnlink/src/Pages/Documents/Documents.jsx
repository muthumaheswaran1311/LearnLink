import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./Documents.css"
import loadersvg from "/src/assets/loader.svg"
import Navbar from '../../components/Navbar/Navbar.jsx'
import Upload from '../../components/Upload/Upload.jsx'
import { DataContext } from '../dataContext.jsx'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

const Documents = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const {showupload,setshowupload,Classroom,loader,fetchClassroom} = useContext(DataContext);
  const [documents, setDocuments] = useState([]);

  const deleteDocument = async(doc)=>{
    try{
      const response = await axios.post(
              "http://localhost:4000/api/delete-document",{id,doc}
            );
      if(response.data.success){
              toast.success(response.data.message);
              fetchClassroom();
      }
    }
    catch(error){


    }
  }
  useEffect(() => {
    fetchClassroom();
  }, []);

  useEffect(() => {
    if (Classroom?.length > 0) {
      const selectedClass = Classroom.find(
        (cls) => cls._id === id
      );

      if (selectedClass) {
        setDocuments(selectedClass.documents);
      }
    }
  }, [Classroom, id]);
  return (
    <div>
      <Navbar/>
      { showupload && <Upload id={id} />}
      <button className='upload-document-button' onClick={()=>setshowupload(true)}>Upload Documents</button>
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
                 <button onClick={()=>deleteDocument(doc)}>Delete</button>
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
