import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { blue, green } from "@mui/material/colors";
import { useContext } from "react";
import { AdContext } from "../../../Context/AdminContext";
export default function PostMaterial({ open }) {
  const timer = React.useRef();
  const { loading, setLoading, postNewMaterial } = useContext(AdContext);
  const [success, setSuccess] = useState(false);
  const [materialInfo, setMaterialInfo] = useState({
    title: "",
    material: "",
    caption: "",
  });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = ["title", "material", "caption"];

    requiredFields.forEach((field) => {
      if (!materialInfo[field]) {
        formErrors[field] = "This field is required";
        isValid = false;
      }
    });

    setErrors(formErrors);
    return isValid;
    // console.log(formErrors);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "material") {
      setMaterialInfo({ ...materialInfo, [name]: e.target.files[0] });
    } else {
      setMaterialInfo({ ...materialInfo, [name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    // console.log(validateForm());
    if (validateForm()) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 2000);
      }
      // Handle form submission logic
      postNewMaterial(materialInfo);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Enter title for material "
            name="title"
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.material}>
            <label htmlFor="upload-material">
              {/* <input
                accept="application/pdf"
                style={{
                  // marginTop: "15px",
                  position: "absolute",
                  paddingLeft: "10px",
                  // backgroundColor: "red",
                  width: "100%",
                  padding: "15px",
                  zIndex: "9999",
                  cursor: "pointer",
                }}
                id="upload-material"
                type="file"
                onChange={handleChange}
                name="material"
              /> */}
              <TextField
                variant="outlined"
                fullWidth
                type="file"
                onChange={handleChange}
                name="material"
                inputProps={{ accept: "application/pdf" }}
                InputLabelProps={{ shrink: true }}
                label="Upload material"
                error={!!errors.material}
                helperText={errors.material}
              />
            </label>
            {/* <FormHelperText>{errors.material}</FormHelperText> */}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Type caption here"
            name="caption"
            error={!!errors.caption}
            helperText={errors.caption}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
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
    </Box>
  );
}
