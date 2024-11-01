import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import moment from "moment";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/AddCircleOutline";
import Remove from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { useContext } from "react";
import { AdContext } from "../../Context/AdminContext";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SucessDialog from "../SuccessDialog/SucessDialog";

export default function UpdateJob({ singleJob, setSingleJob }) {
  //   console.log(singleJob);
  const {
    loading,
    setLoading,
    updateJob,
    success,
    setSuccess,
    handleCloseSuccess,
    companyInfo,
    setCompanyInfo,
  } = useContext(AdContext);

  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    setCompanyInfo({
      name: singleJob?.companyData?.name,
      about: singleJob?.companyData?.about,
      website: singleJob?.companyData?.website,
      logo: singleJob?.companyData?.logo,
    });
    setLoading(false);
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSingleJob({ ...singleJob, [e.target.name]: e.target.value });
  };
  const handleChangeDate = (e) => {
    // console.log(e.target.value);
    let date = e.target.value;
    const parts = date.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    // console.log(formattedDate);
    setSingleJob({ ...singleJob, interviewDate: formattedDate });
  };
  const handleFileChange = (e) => {
    setCompanyInfo({ ...companyInfo, logo: e.target.files[0] });
  };
  const handleCompanyData = (e) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (index, event) => {
    const values = [...singleJob.jobSkills];
    values[index] = event.target.value;
    setSingleJob({ ...singleJob, jobSkills: values });
  };
  const handleKeysChange = (index, event) => {
    const values = [...singleJob.keyResponsibilities];
    values[index] = event.target.value;
    setSingleJob({ ...singleJob, keyResponsibilities: values });
  };
  const handleMustHavesChange = (index, event) => {
    const values = [...singleJob.mustHaves];
    values[index] = event.target.value;
    setSingleJob({ ...singleJob, mustHaves: values });
  };

  const handleAddSkill = () => {
    const values = [...singleJob.jobSkills];
    values.push([]);
    setSingleJob({ ...singleJob, jobSkills: values });
  };
  const handleAddKeys = () => {
    const values = [...singleJob.keyResponsibilities];
    values.push([]);
    setSingleJob({ ...singleJob, keyResponsibilities: values });
  };
  const handleAddExperience = () => {
    const values = [...singleJob.mustHaves];
    values.push([]);
    setSingleJob({ ...singleJob, mustHaves: values });
  };

  const handleRemoveSkill = (index) => {
    const values = [...singleJob.jobSkills];
    values.splice(index, 1);
    setSingleJob({ ...singleJob, jobSkills: values });
  };

  const handleRemoveKey = (index) => {
    const values = [...singleJob.keyResponsibilities];
    values.splice(index, 1);
    setSingleJob({ ...singleJob, keyResponsibilities: values });
  };

  const handleRemoveExperience = (index) => {
    const values = [...singleJob.mustHaves];
    values.splice(index, 1);
    setSingleJob({ ...singleJob, mustHaves: values });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = [
      "jobTitle",
      "jobType",
      "jobTimeType",
      "jobRole",
      "jobVacancy",
      "jobLocation",
      "jobExperience",
      "jobDescription",
      "interviewLocation",
      "interviewMode",
      "interviewDate",
    ];

    requiredFields.forEach((field) => {
      if (!singleJob[field]) {
        formErrors[field] = "This field is required";
        isValid = false;
      }
    });
    const requiredCompanyFields = ["name", "about", "log", "website"];

    requiredCompanyFields.forEach((field) => {
      if (!companyInfo[field]) {
        formErrors[field] = "This field is required";
        isValid = false;
      }
    });
    // console.log(singleJob.jobSkills[0]);
    if (singleJob.jobSkills[0] == null) {
      formErrors.jobSkills = "At least one skill is required";
      isValid = false;
    }
    if (singleJob.keyResponsibilities[0] == null) {
      formErrors.keyResponsibilities =
        "At least one key responsibility is required";
      isValid = false;
    }
    // if (singleJob.logo == null) {
    //   formErrors.logo = "Company logo is required";
    //   isValid = false;
    // }
    if (singleJob.interviewDate == null) {
      formErrors.interviewDate = "Interview date is required";
      isValid = false;
    }
    if (singleJob.mustHaves[0] == null) {
      formErrors.mustHaves = "At least one must-have is required";
      isValid = false;
    } else {
      isValid = true;
    }

    setErrors(formErrors);
    return isValid;
    // console.log(formErrors);
  };
  const handleSubmit = (e) => {
    // console.log(validateForm());
    if (validateForm()) {
      // setSuccess(false);
      setLoading(true);
      setSuccess(true);
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Handle form submission logic
      let updated = {
        ...singleJob,
        companyData: companyInfo,
      };
      updateJob(updated);
    }
  };
  //   console.log(singleJob);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Title"
            name="jobTitle"
            value={singleJob?.jobTitle}
            error={!!errors.jobTitle}
            helperText={errors.jobTitle}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Role"
            name="jobRole"
            value={singleJob?.jobRole}
            error={!!errors.jobRole}
            helperText={errors.jobRole}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Number of Vacancies"
            name="jobVacancy"
            value={singleJob?.jobVacancy}
            error={!!errors.jobVacancy}
            helperText={errors.jobVacancy}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Type"
            name="jobType"
          /> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Job Type"
              name="jobType"
              value={singleJob?.jobType || ""}
              onChange={handleChange}
            >
              <MenuItem value={"On-site"}>On-site</MenuItem>
              <MenuItem value={"Remote"}>Remote</MenuItem>
              <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" color="error">
            {errors.jobType}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Job Duration Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Job Duration Type"
              name="jobTimeType"
              value={singleJob?.jobTimeType || ""}
              onChange={handleChange}
            >
              <MenuItem value={"Full Time"}>Full Time</MenuItem>
              <MenuItem value={"Part Time"}>Part Time</MenuItem>
            </Select>
            <Typography variant="caption" color="error">
              {errors.jobTimeType}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Location"
            name="jobLocation"
            error={!!errors.jobLocation}
            helperText={errors.jobLocation}
            value={singleJob?.jobLocation}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Experience"
            name="jobExperience"
            value={singleJob?.jobExperience}
            error={!!errors.jobExperience}
            helperText={errors.jobExperience}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleCompanyData}
            fullWidth
            variant="outlined"
            label="Enter Company name"
            name="name"
            value={companyInfo?.name}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            label="Upload Company Logo"
            name="logo"
            type="file"
            InputLabelProps={{ shrink: true }}
            error={!!errors.logo}
            helperText={errors.logo}
          />
          {/* <Typography variant="caption" color="error">
            {errors.logo}
          </Typography> */}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleCompanyData}
            fullWidth
            variant="outlined"
            label="Company Website link"
            name="website"
            type="url"
            value={companyInfo?.website}
            error={!!errors.website}
            helperText={errors.website}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleCompanyData}
            fullWidth
            variant="outlined"
            label="About Company"
            name="about"
            value={companyInfo?.about}
            multiline
            error={!!errors.about}
            helperText={errors.about}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Type job description here"
            name="jobDescription"
            value={singleJob?.jobDescription}
            multiline
            error={!!errors.jobDescription}
            helperText={errors.jobDescription}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter interview location"
            name="interviewLocation"
            value={singleJob?.interviewLocation}
            error={!!errors.interviewLocation}
            helperText={errors.interviewLocation}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ mt: -1 }} components={["DateTimePicker"]}>
              {/* <DemoItem
                label={
                  <Label componentName="DateTimePicker" valueType="date time" />
                }
              > */}
              {/* <DateTimePicker
                onChange={handleChangeDate}
                label="Select Interview Date"
                name="interviewDate"
                error={!!errors.interviewDate}
                helperText={errors.interviewDate}
              /> */}
              {/* {console.log(singleJob?.interviewDate)} */}
              <TextField
                onChange={handleChangeDate}
                fullWidth
                variant="outlined"
                type="date"
                label={singleJob?.interviewDate}
                name="interviewDate"
                // value={singleJob?.interviewDate}
                // value={moment(singleJob?.interviewDate).format("dd-mm-yyyy")}
                error={!!errors.interviewDate}
                helperText={errors.interviewDate}
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="caption" color="error">
                {errors.interviewDate}
              </Typography>
              {/* </DemoItem> */}
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Interview Mode
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Interview Mode"
              name="interviewMode"
              onChange={handleChange}
              value={singleJob?.interviewMode || ""}
            >
              <MenuItem value={"Offline"}>Offline</MenuItem>
              <MenuItem value={"Online"}>Online</MenuItem>
              <MenuItem value={"On campus"}>On campus</MenuItem>
            </Select>
            <Typography variant="caption" color="error">
              {errors.interviewMode}
            </Typography>
          </FormControl>
        </Grid>

        {singleJob?.jobSkills?.map((info, index) => (
          <>
            <Grid sx={{ display: "flex" }} item xs={12} sm={4} key={index}>
              <TextField
                onChange={(event) => handleSkillsChange(index, event)}
                fullWidth
                variant="outlined"
                label="Enter Skill"
                name="jobSkills"
                value={info}
                error={!!errors.jobSkills}
                helperText={index === 0 ? errors.jobSkills : ""}
              />
              {/* {console.log(errors)} */}
              <IconButton
                type="button"
                color="error"
                onClick={() => handleRemoveSkill(index)}
              >
                <Remove />
              </IconButton>
            </Grid>
          </>
        ))}
        {singleJob?.keyResponsibilities?.map((info, index) => (
          <>
            <Grid sx={{ display: "flex" }} item xs={12} sm={4} key={index}>
              <TextField
                onChange={(event) => handleKeysChange(index, event)}
                fullWidth
                variant="outlined"
                label="Enter key responsibilities"
                name="keyResponsibilities"
                multiline
                value={info}
                error={!!errors.keyResponsibilities}
                helperText={index === 0 ? errors.keyResponsibilities : ""}
              />
              <IconButton
                type="button"
                color="error"
                onClick={() => handleRemoveKey(index)}
              >
                <Remove />
              </IconButton>
            </Grid>
          </>
        ))}
        {singleJob?.mustHaves?.map((info, index) => (
          <>
            <Grid sx={{ display: "flex" }} item xs={12} sm={4} key={index}>
              <TextField
                onChange={(event) => handleMustHavesChange(index, event)}
                fullWidth
                variant="outlined"
                label="Enter must have points"
                name="mustHaves"
                multiline
                value={info}
                error={!!errors.mustHaves}
                helperText={index === 0 ? errors.mustHaves : ""}
              />
              <IconButton
                type="button"
                color="error"
                onClick={() => handleRemoveExperience(index)}
              >
                <Remove />
              </IconButton>
            </Grid>
          </>
        ))}
        <Grid sx={{}} item xs={12} sm={12}>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={buttonSx}
            disabled={loading}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1 }}>
        <Typography variant="overline">Add more</Typography>
      </Divider>
      <Grid sx={{ display: "flex", mt: 1 }} container spacing={2}>
        <Grid item xs={4} sm={4}>
          <Button
            startIcon={<Add />}
            fullWidth
            variant="outlined"
            type="button"
            onClick={() => handleAddSkill()}
          >
            Skills
          </Button>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Button
            startIcon={<Add />}
            fullWidth
            variant="outlined"
            type="button"
            onClick={() => handleAddKeys()}
          >
            Keys
          </Button>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Button
            startIcon={<Add />}
            fullWidth
            variant="outlined"
            type="button"
            onClick={() => handleAddExperience()}
          >
            Experiences
          </Button>
        </Grid>
      </Grid>
      <SucessDialog
        title="Post Updated!"
        message="Post updated successfully!"
        openState={success}
        closeState={handleCloseSuccess}
      />
    </Box>
  );
}
if (typeof window !== "undefined") {
  const resizeObserverErrDiv = document.createElement("div");
  resizeObserverErrDiv.id = "webpack-dev-server-client-overlay-div";
  resizeObserverErrDiv.style.display = "none";
  document.body.appendChild(resizeObserverErrDiv);

  const resizeObserverErrStyle = document.createElement("style");
  resizeObserverErrStyle.innerHTML = `
    #webpack-dev-server-client-overlay-div {
      display: none;
    }
  `;
  document.head.appendChild(resizeObserverErrStyle);
}
