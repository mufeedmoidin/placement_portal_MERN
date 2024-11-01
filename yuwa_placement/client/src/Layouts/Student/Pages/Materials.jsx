import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import MaterialPost from "../Components/Materials/MaterialPost";
import NoResults from "../Components/NoResults/NoResult";
import { useContext } from "react";
import { StContext } from "../Context/StudentContext";
import { useEffect } from "react";

export default function Materials() {
  const {
    setAllMaterials,
    allMaterials,
    viewAllMaterialPosts,
    setLoading,
    loading,
  } = useContext(StContext);
  const [search, setSearch] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    viewAllMaterialPosts();
  }, []);

  useEffect(() => {
    const filterMaterials = () => {
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
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    filterMaterials();
  }, [search, allMaterials]);

  //   console.log(allMaterials);
  //   console.log(loading);
  //   console.log(filteredMaterials);
  return (
    <div>
      <Box sx={{ minHeight: "100vh", p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center", p: 1 }}
        >
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="search for material"
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
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            // pt: 5,
            // backgroundColor: "red",
          }}
        >
          {filteredMaterials.length > 0 ? (
            filteredMaterials?.map((item, index) => (
              <Grid mt={3} item xs={12} key={index} sm={3}>
                <MaterialPost data={item} loading={loading} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={4}>
              <NoResults />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
