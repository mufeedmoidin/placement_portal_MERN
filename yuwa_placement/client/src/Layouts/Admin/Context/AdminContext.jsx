import axios from "axios";
import { createContext, useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const AdContext = createContext();

export default function AdminContext(props) {
  let navigate = useNavigate();
  const [adminToken, setAdminToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [singleJob, setSingleJob] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    about: "",
    website: "",
    // logo: "",
  });
  const [singleMaterial, setSingleMaterial] = useState(null);
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [report, setReport] = useState({});
  const handleCloseSuccess = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };
  useEffect(() => {
    var token;
    if (localStorage.getItem("AdminToken") != null) {
      token = JSON.parse(localStorage.getItem("AdminToken"));
      setAdminToken(token);
      axios
        .get("http://localhost:7000/admin/getAdminProfile", {
          headers: { "auth-token": token },
        })
        .then((res) => {
          setAdmin(res.data.admin);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      navigate("/admin");
    }
  }, [state]);
  const getAllStudents = async () => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get("http://localhost:7000/admin/getAllStudents", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAllStudents(res.data.students);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllJobPosts = async () => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get("http://localhost:7000/admin/getAllJobPosts", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAllJobs(res.data.allJobs);
        // console.log(res.data.allJobs);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllFeedbacks = async () => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get("http://localhost:7000/admin/getAllFeedbacks", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAllFeedbacks(res.data.feedbacks);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const postNewJob = async (info) => {
    // console.log(info);
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    const data = new FormData();
    data.append("name", info.name);
    data.append("about", info.about);
    data.append("logo", info.logo);
    data.append("website", info.website);
    data.append("jobTitle", info.jobTitle);
    data.append("jobType", info.jobType);
    data.append("jobTimeType", info.jobTimeType);
    data.append("jobRole", info.jobRole);
    data.append("jobVacancy", info.jobVacancy);
    data.append("jobLocation", info.jobLocation);
    data.append("jobExperience", info.jobExperience);
    info.jobSkills.map((item) => {
      data.append("jobSkills", item);
    });
    info.keyResponsibilities.map((item) => {
      data.append("keyResponsibilities", item);
    });
    info.mustHaves.map((item) => {
      data.append("mustHaves", item);
    });
    data.append("jobDescription", info.jobDescription);
    // data.append("keyResponsibilities", info.keyResponsibilities);
    // data.append("mustHaves", info.mustHaves);
    data.append("interviewLocation", info.interviewLocation);
    data.append("interviewMode", info.interviewMode);
    data.append("interviewDate", info.interviewDate);
    axios
      .post("http://localhost:7000/admin/postJob", data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          alert(res.data.message);
          setTimeout(() => {
            setSuccess(false);
            setLoading(false);
            navigate("/admin/Placement/View");
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateJob = async (info) => {
    // console.log(info);
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    const data = new FormData();
    data.append("name", info?.companyData?.name);
    data.append("about", info?.companyData?.about);
    data.append("logo", info?.companyData?.logo);
    data.append("website", info?.companyData?.website);
    data.append("jobTitle", info.jobTitle);
    data.append("jobType", info.jobType);
    data.append("jobTimeType", info.jobTimeType);
    data.append("jobRole", info.jobRole);
    data.append("jobVacancy", info.jobVacancy);
    data.append("jobLocation", info.jobLocation);
    data.append("jobExperience", info.jobExperience);
    info.jobSkills.map((item) => {
      data.append("jobSkills", item);
    });
    info.keyResponsibilities.map((item) => {
      data.append("keyResponsibilities", item);
    });
    info.mustHaves.map((item) => {
      data.append("mustHaves", item);
    });
    data.append("jobDescription", info.jobDescription);
    // // data.append("keyResponsibilities", info.keyResponsibilities);
    // // data.append("mustHaves", info.mustHaves);
    data.append("interviewLocation", info.interviewLocation);
    data.append("interviewMode", info.interviewMode);
    data.append("interviewDate", info.interviewDate);
    axios
      .put("http://localhost:7000/admin/updateJobPost/" + info?._id, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          handleCloseSuccess();
          setTimeout(() => {
            navigate("/admin/Placement/View");
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateStudent = async (data, status) => {
    // console.log(data);
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .put(
        "http://localhost:7000/admin/updateStudent/" + data?._id,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          handleCloseSuccess();
          setTimeout(() => {
            getAllStudents();
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deletePost = async (data) => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .delete(`http://localhost:7000/admin/deletePost/${data?._id}`, {
        headers: { "auth-token": token },
      })
      .then(async (response) => {
        if (response.data.success) {
          setTimeout(() => {
            getAllJobPosts();
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    // console.log(data?._id);
  };
  const getSinglePost = async (id) => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get(`http://localhost:7000/admin/singlePost/${id}`, {
        headers: { "auth-token": token },
      })
      .then(async (response) => {
        setSingleJob(response.data.post);
        setCompanyInfo(response.data.post.companyData);
      })
      .catch((err) => {
        alert(err.message);
      });
    // console.log(data?._id);
  };

  const postNewMaterial = async (info) => {
    // console.log(info);
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    const data = new FormData();
    data.append("title", info.title);
    data.append("caption", info.caption);
    data.append("material", info.material);
    axios
      .post("http://localhost:7000/admin/postMaterial", data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          alert(res.data.message);
          setTimeout(() => {
            navigate("/admin/Material/View");
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllMaterials = async () => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get("http://localhost:7000/admin/getAllMaterials", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAllMaterials(res.data.allMaterials);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deleteMaterial = async (data) => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .delete(`http://localhost:7000/admin/deleteMaterial/${data?._id}`, {
        headers: { "auth-token": token },
      })
      .then(async (response) => {
        if (response.data.success) {
          setTimeout(() => {
            getAllMaterials();
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    // console.log(data?._id);
  };
  const getSingleMaterial = async (id) => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get(`http://localhost:7000/admin/singleMaterial/${id}`, {
        headers: { "auth-token": token },
      })
      .then(async (response) => {
        setSingleMaterial(response.data.material);
      })
      .catch((err) => {
        alert(err.message);
      });
    // console.log(data?._id);
  };
  const updateMaterial = async (info) => {
    // console.log(info);
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    const data = new FormData();
    data.append("title", info.title);
    data.append("caption", info.caption);
    data.append("material", info.material);
    axios
      .put("http://localhost:7000/admin/updateMaterial/" + info?._id, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          // alert(res.data.message);
          handleCloseSuccess();
          setTimeout(() => {
            navigate("/admin/Material/View");
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getAllReport = async () => {
    let token = JSON.parse(localStorage.getItem("AdminToken"));
    axios
      .get("http://localhost:7000/admin/getReport", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setReport({
          studentsCount: res.data.s.length,
          jobsCount: res.data.j.length,
          MaterialsCount: res.data.m.length,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <AdContext.Provider
      value={{
        adminToken,
        setAdminToken,
        navigate,
        admin,
        setAdmin,
        state,
        setState,
        allStudents,
        setAllStudents,
        allFeedbacks,
        setAllFeedbacks,
        loading,
        setLoading,
        postNewJob,
        allJobs,
        setAllJobs,
        getAllFeedbacks,
        getAllJobPosts,
        getAllStudents,
        deletePost,
        getSinglePost,
        singleJob,
        setSingleJob,
        updateJob,
        success,
        setSuccess,
        handleCloseSuccess,
        updateStudent,
        postNewMaterial,
        getAllMaterials,
        allMaterials,
        setAllMaterials,
        deleteMaterial,
        singleMaterial,
        setSingleMaterial,
        getSingleMaterial,
        updateMaterial,
        report,
        setReport,
        getAllReport,
        companyInfo,
        setCompanyInfo,
      }}
    >
      {props.children}
    </AdContext.Provider>
  );
}
