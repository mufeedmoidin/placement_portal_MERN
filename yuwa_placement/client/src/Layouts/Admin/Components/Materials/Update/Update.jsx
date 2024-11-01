import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { useContext } from "react";
import { AdContext } from "../../../Context/AdminContext";
import SucessDialog from "../../SuccessDialog/SucessDialog";
export default function UpdateMaterial({ data, id }) {
  const timer = React.useRef();
  const {
    loading,
    setLoading,
    updateMaterial,
    success,
    setSuccess,
    handleCloseSuccess,
  } = useContext(AdContext);
  // const [success, setSuccess] = useState(false);
  const [materialInfo, setMaterialInfo] = useState(data);
  const [errors, setErrors] = useState({});

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    setMaterialInfo(data);
    return () => {
      clearTimeout(timer.current);
    };
  }, [data, id]);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = ["title", "material", "caption"];

    requiredFields.forEach((field) => {
      if (!materialInfo[field]) {
        formErrors[field] = "This field is required";
        isValid = false;
      } else if (materialInfo[field] == "") {
        formErrors[field] = "This field cannot be empty";
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
        setSuccess(true);
        // setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
      // Handle form submission logic
      updateMaterial(materialInfo);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={materialInfo?.title}
            InputLabelProps={{ shrink: true }}
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
            value={materialInfo?.caption}
            InputLabelProps={{ shrink: true }}
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
                marginTop: { xs: "-65px", sm: "-35px" },
                marginLeft: { xs: "-25px", sm: "-12px" },
              }}
            />
          )}
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
