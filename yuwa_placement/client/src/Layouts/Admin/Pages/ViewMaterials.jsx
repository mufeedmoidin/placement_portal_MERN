import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import ViewAll from "../Components/Materials/View/ViewAll";
import { useContext } from "react";
import { AdContext } from "../Context/AdminContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
export default function ViewMaterials() {
  const { getAllMaterials, allMaterials, setAllMaterials } =
    useContext(AdContext);
  const [search, setSearch] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([allMaterials]);

  // console.log(allMaterials);
  useEffect(() => {
    getAllMaterials();
  }, []);

  useEffect(() => {
    const filterMaterial = () => {
      var materials = allMaterials;
      if (search) {
        materials = materials.filter(
          (mat) =>
            mat?.title?.toLowerCase().includes(search?.toLowerCase()) ||
            mat?.caption?.toLowerCase().includes(search?.toLowerCase())
        );
      } else {
        materials = allMaterials;
      }
      setFilteredMaterials(materials);
    };

    filterMaterial();
  }, [search, allMaterials]);
  return (
    <div>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Material"}
        title3={"View All"}
        isTitle2={true}
        isTitle3={true}
      />
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="search for material "
            //   variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // sx={{ mt: 5 }}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          sx={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            // pt: 2,
            // mt: 2,
          }}
          item
          xs={12}
          sm={2}
        >
          <Link to={"/admin/Material/Post"} style={{}}>
            <Button
              sx={{ color: "#222a45f5" }}
              startIcon={<AddBoxIcon sx={{ color: "#222a45f5" }} />}
              variant="outlined"
            >
              New Post
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box>
        <ViewAll data={filteredMaterials} />
      </Box>
    </div>
  );
}
