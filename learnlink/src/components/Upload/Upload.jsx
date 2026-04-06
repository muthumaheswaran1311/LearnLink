import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload,faXmark } from '@fortawesome/free-solid-svg-icons'
import "./Upload.css"
import { DataContext } from '../../Pages/dataContext.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Upload = ({id}) => {
    const[documents,setdocuments] = useState({});
    const[file,setfile] = useState(null);
    const {fetchClassroom} = useContext(DataContext);
      
    const sendDocuments = async() => {
         try{  
            const formData = new FormData();
            formData.append("id",id);
            formData.append("name",documents.name);
            formData.append("description",documents.description);
            formData.append("document",file);
            const response = await axios.post(
                "http://localhost:4000/api/add-document",formData);
      if(response.data.success){
        toast.success(response.data.message);
        setshowupload(false);
        fetchClassroom();

      }
      
      }
        catch(error){
            console.log(error);
        }

    }
    
    const{setshowupload} = useContext(DataContext);
    const filehandler = (e) => {
        setfile(e.target.files[0]);
    }
    const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdocuments({...documents,[name]:value});
  }

  

  return (
    <div className='upload-section'>
        <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={()=>{setshowupload(false)}}/>
        <h1 className='upload-component-heading'>Upload your documents here</h1>
        <div className='cloud-section'>
            <FontAwesomeIcon icon={faCloudUpload} className='cloud-icon' />
            <label className='cloud-label' htmlFor='file-input' >Choose file</label>
            <input type='file' id='file-input' onChange={filehandler} hidden/>
        </div>
        <div className='input-sections'>
            <div className='input-section' >
            <label >Enter Document Name</label>
            <input type='text' className='input-tag' name='name' onChange={inputHandler} />
        </div>
        <div className='input-section'>
            <label >Enter Description</label>
            <textarea className='input-tag' name='description' onChange={inputHandler} />
        </div>
        <button className='upload-button-heading' onClick={sendDocuments}>Submit</button>
        </div>
        
        
        
    </div>
  )
}

export default Upload
