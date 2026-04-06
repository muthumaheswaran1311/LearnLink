import React, { useState } from "react";
import "./Role.css";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Role = () => {
  const [Tselected, setTselected] = useState(false);
  const [Sselected, setSselected] = useState(false);
  const [role, setRole] = useState("");

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const submitRole = async () => {
    try {

      if (!role) {
        alert("Please select a role");
        return;
      }

      const token = await getToken();

      const response = await axios.post(
        "http://localhost:4000/api/set-role",
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(token);

      if (response.data.success) {
        navigate(`/${role}-dashboard`);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="role-section">
      <p className="role-heading">Select your role?</p>

      <div className="roles">
        <p
          onClick={() => {
            setTselected(true);
            setSselected(false);
            setRole("teacher");
          }}
          style={{
            backgroundColor: Tselected ? "rgb(255,0,136)" : "gray",
          }}
        >
          I am a Teacher
        </p>

        <p
          onClick={() => {
            setSselected(true);
            setTselected(false);
            setRole("student");
          }}
          style={{
            backgroundColor: Sselected ? "rgb(255,0,136)" : "gray",
          }}
        >
          I am a Student
        </p>
      </div>

      <button className="role-submit" onClick={submitRole}>
        Submit
      </button>
    </div>
  );
};

export default Role;