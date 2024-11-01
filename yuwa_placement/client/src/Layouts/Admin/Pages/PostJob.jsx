import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
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
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { blue, green } from "@mui/material/colors";
import { useContext } from "react";
import { AdContext } from "../Context/AdminContext";
import Add from "@mui/icons-material/AddCircleOutline";
import Remove from "@mui/icons-material/Remove";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function PostJob() {
  const { loading, setLoading, postNewJob } = useContext(AdContext);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  const buttonSx = {
    backgroundColor: "#222a45f5",
    ...(success && {
      bgcolor: blue[900],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [jobInfo, setJobInfo] = useState({
    name: "",
    about: "",
    logo: null,
    website: "",
    jobTitle: "",
    jobType: "",
    jobTimeType: "",
    jobRole: "",
    jobVacancy: "",
    jobLocation: "",
    jobExperience: "",
    jobSkills: [null],
    jobDescription: "",
    keyResponsibilities: [null],
    mustHaves: [null],
    interviewLocation: "",
    interviewMode: "",
    interviewDate: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setJobInfo({ ...jobInfo, [e.target.name]: e.target.value });
  };
  const handleChangeDate = (e) => {
    // console.log(e.target.value);
    let date = e.target.value;
    const parts = date.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    // console.log(formattedDate);
    setJobInfo({ ...jobInfo, interviewDate: formattedDate });
  };
  const handleFileChange = (e) => {
    setJobInfo({ ...jobInfo, [e.target.name]: e.target.files[0] });
  };

  const handleSkillsChange = (index, event) => {
    const values = [...jobInfo.jobSkills];
    values[index] = event.target.value;
    setJobInfo({ ...jobInfo, jobSkills: values });
  };
  const handleKeysChange = (index, event) => {
    const values = [...jobInfo.keyResponsibilities];
    values[index] = event.target.value;
    setJobInfo({ ...jobInfo, keyResponsibilities: values });
  };
  const handleMustHavesChange = (index, event) => {
    const values = [...jobInfo.mustHaves];
    values[index] = event.target.value;
    setJobInfo({ ...jobInfo, mustHaves: values });
  };

  const handleAddSkill = () => {
    const values = [...jobInfo.jobSkills];
    values.push([]);
    setJobInfo({ ...jobInfo, jobSkills: values });
  };
  const handleAddKeys = () => {
    const values = [...jobInfo.keyResponsibilities];
    values.push([]);
    setJobInfo({ ...jobInfo, keyResponsibilities: values });
  };
  const handleAddExperience = () => {
    const values = [...jobInfo.mustHaves];
    values.push([]);
    setJobInfo({ ...jobInfo, mustHaves: values });
  };

  const handleRemoveSkill = (index) => {
    const values = [...jobInfo.jobSkills];
    values.splice(index, 1);
    setJobInfo({ ...jobInfo, jobSkills: values });
  };

  const handleRemoveKey = (index) => {
    const values = [...jobInfo.keyResponsibilities];
    values.splice(index, 1);
    setJobInfo({ ...jobInfo, keyResponsibilities: values });
  };

  const handleRemoveExperience = (index) => {
    const values = [...jobInfo.mustHaves];
    values.splice(index, 1);
    setJobInfo({ ...jobInfo, mustHaves: values });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = [
      "name",
      "about",
      "log",
      "website",
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
      if (!jobInfo[field]) {
        formErrors[field] = "This field is required";
        isValid = false;
      }
    });
    // console.log(jobInfo.jobSkills[0]);
    if (jobInfo.jobSkills[0] == null) {
      formErrors.jobSkills = "At least one skill is required";
      isValid = false;
    }
    if (jobInfo.keyResponsibilities[0] == null) {
      formErrors.keyResponsibilities =
        "At least one key responsibility is required";
      isValid = false;
    }
    if (jobInfo.logo == null) {
      formErrors.logo = "Company logo is required";
      isValid = false;
    }
    if (jobInfo.interviewDate == null) {
      formErrors.interviewDate = "Interview date is required";
      isValid = false;
    }
    if (jobInfo.mustHaves[0] == null) {
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
      // if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
      // }
      // Handle form submission logic
      postNewJob(jobInfo);
    }
  };
  //   console.log(jobInfo);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Placements"}
        title3={"New Post"}
        isTitle2={true}
        isTitle3={true}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Title"
            name="jobTitle"
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
              value={jobInfo?.jobType || ""}
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
              value={jobInfo?.jobTimeType || ""}
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
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Job Experience"
            name="jobExperience"
            error={!!errors.jobExperience}
            helperText={errors.jobExperience}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter Company name"
            name="name"
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
          <Typography variant="caption" color="error">
            {errors.logo}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Company Website link"
            name="website"
            type="url"
            error={!!errors.website}
            helperText={errors.website}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="About Company"
            name="about"
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
              <TextField
                onChange={handleChangeDate}
                fullWidth
                variant="outlined"
                type="date"
                label="Select Interview Date"
                name="interviewDate"
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
              value={jobInfo?.interviewMode || ""}
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

        {jobInfo.jobSkills?.map((info, index) => (
          <>
            <Grid sx={{ display: "flex" }} item xs={12} sm={4} key={index}>
              <TextField
                onChange={(event) => handleSkillsChange(index, event)}
                fullWidth
                variant="outlined"
                label="Enter Skill"
                name="jobSkills"
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
        {jobInfo.keyResponsibilities?.map((info, index) => (
          <>
            <Grid sx={{ display: "flex" }} item xs={12} sm={4} key={index}>
              <TextField
                onChange={(event) => handleKeysChange(index, event)}
                fullWidth
                variant="outlined"
                label="Enter key responsibilities"
                name="keyResponsibilities"
                multiline
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
        {jobInfo.mustHaves?.map((info, index) => (
          <>
            <Grid sx={{ display: "flex" }} item xs={12} sm={4} key={index}>
              <TextField
                onChange={(event) => handleMustHavesChange(index, event)}
                fullWidth
                variant="outlined"
                label="Enter must have points"
                name="mustHaves"
                multiline
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
            {loading ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Typography color="success" fontWeight={"bolder"}>
                  Loading
                </Typography>
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                  }}
                />
              </Box>
            ) : (
              "Submit"
            )}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1 }}>
        <Typography variant="overline">Add more</Typography>
      </Divider>
      <Grid sx={{ display: "flex", mt: 1 }} container spacing={2}>
        <Grid item xs={4} sm={4}>
          <Button
            sx={{ color: "#222a45f5" }}
            startIcon={<Add sx={{ color: "#222a45f5" }} />}
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
            sx={{ color: "#222a45f5" }}
            startIcon={<Add sx={{ color: "#222a45f5" }} />}
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
            sx={{ color: "#222a45f5" }}
            startIcon={<Add sx={{ color: "#222a45f5" }} />}
            fullWidth
            variant="outlined"
            type="button"
            onClick={() => handleAddExperience()}
          >
            Experiences
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
if (typeof window !== "undefined") {
  const { ResizeObserver } = window;
  if (ResizeObserver) {
    const ro = new ResizeObserver(() => {});
    ro.observe(document.body);
  }
}
