import axios from "axios";
import { createContext, useState } from "react";
import { useAuth } from '@clerk/clerk-react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  
 const [loader,setloader] = useState(false);
 const [Classroom,setClassroom] = useState([]);
  const { getToken } = useAuth(); 
const[showupload,setshowupload] = useState(false);
 
 const fetchClassroom = async() => {
  try{
    const token = await getToken();
    setloader(true);
    const response = await axios.get(
        "http://localhost:4000/api/fetch-classroom",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.success){
        setloader(false);
        setClassroom(response.data.classroom);
        
      }
  }
  catch(error){
    console.log(error);
  }
 }
  
  return (
    <DataContext.Provider value={{fetchClassroom,loader,Classroom,setloader,setshowupload,showupload}}>
      {children}
    </DataContext.Provider>
  );
};