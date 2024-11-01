import axios from "axios";
import { createContext, useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StContext = createContext();
export default function StudentContext(props) {
  let navigate = useNavigate();
  const [studentToken, setStudentToken] = useState(null);
  const [student, setStudent] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [singleJob, setSingleJob] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("StudentToken") != null) {
      setStudentToken(JSON.parse(localStorage.getItem("StudentToken")));
    }
  }, []);
  const authUser = () => {
    var token;
    if (localStorage.getItem("StudentToken") != null) {
      token = JSON.parse(localStorage.getItem("StudentToken"));
      setStudentToken(token);
      return token;
    } else {
      navigate("/login");
      return false;
    }
  };
  const getStudentProfile = () => {
    var token;
    if (authUser()) {
      token = JSON.parse(localStorage.getItem("StudentToken"));
      axios
        .get("http://localhost:7000/student/getStudentProfile", {
          headers: { "auth-token": token },
        })
        .then((res) => {
          // console.log(res.data.student);
          setStudent(res.data.student);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const updateStudentProfile = (info) => {
    console.log(info);
    let data = new FormData();
    data.append("name", info?.name);
    data.append("phone", info?.phone);
    data.append("profile", info?.profile);
    data.append("npass", info?.npass);
    var token;
    if (authUser()) {
      token = JSON.parse(localStorage.getItem("StudentToken"));
      axios
        .put("http://localhost:7000/student/updateProfile", data, {
          headers: { "auth-token": token },
        })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            getStudentProfile();
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const viewAllJobPosts = () => {
    var token;
    if (authUser()) {
      token = JSON.parse(localStorage.getItem("StudentToken"));
      axios
        .get("http://localhost:7000/student/viewAllJobPosts", {
          headers: { "auth-token": token },
        })
        .then((res) => {
          // console.log(res.data.allJobs);
          setAllJobs(res.data.allJobs);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const viewSingleJobPost = (id) => {
    var token;
    if (authUser()) {
      token = JSON.parse(localStorage.getItem("StudentToken"));
      axios
        .get("http://localhost:7000/student/viewSingleJobPost/" + id, {
          headers: { "auth-token": token },
        })
        .then((res) => {
          // console.log(res.data.job);
          setSingleJob(res.data.job);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const viewAllMaterialPosts = () => {
    var token;
    if (authUser()) {
      token = JSON.parse(localStorage.getItem("StudentToken"));
      axios
        .get("http://localhost:7000/student/viewAllMaterialPosts", {
          headers: { "auth-token": token },
        })
        .then((res) => {
          // console.log(res.data.allJobs);
          setAllMaterials(res.data.allMaterials);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <StContext.Provider
      value={{
        studentToken,
        setStudentToken,
        getStudentProfile,
        navigate,
        student,
        setStudent,
        viewAllJobPosts,
        allJobs,
        setAllJobs,
        singleJob,
        setSingleJob,
        viewSingleJobPost,
        setAllMaterials,
        allMaterials,
        viewAllMaterialPosts,
        setLoading,
        loading,
        updateStudentProfile,
      }}
    >
      {props.children}
    </StContext.Provider>
  );
}
