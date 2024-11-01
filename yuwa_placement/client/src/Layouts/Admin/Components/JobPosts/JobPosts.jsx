import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Edit from "@mui/icons-material/EditNote";
import Delete from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import moment from "moment";
import DeleteJob from "./DeleteJob";
import { useState } from "react";
export default function JobPosts({ data }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const formattedDate = moment(data?.createdAt).format("DD-MM-YYYY");
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: 128,
        },
      }}
    >
      <Paper elevation={5}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            p: 1,
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "10%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "start", sm: "center" },
              pt: { xs: 2, sm: 0 },
            }}
          >
            <Avatar
              src={`http://localhost:7000/uploads/jobs/${data?.companyData?.logo}`}
              alt="logo"
              sx={{
                width: { xs: "100%", sm: "100%" },
                height: { xs: "auto", sm: "100%" },
              }}
            />
          </Box>
          <Box
            sx={{
              width: "90%",
              height: "100%",
              p: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: { xs: "75%", sm: "83%" },
                height: "100%",
                p: 1,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Link
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bolder",

                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "bolder",
                  }}
                >
                  {data?.jobTitle}
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "bolder",
                }}
              >
                {data?.companyData?.name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  {data?.jobLocation} {`( ${data?.jobType} )`}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "Poppins",
                  }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "23%", sm: "15%" },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "space-evenly" },
                p: 1,

                height: "100%",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                }}
                component={Link}
                to={`${data?._id}`}
              >
                <IconButton color="secondary" sx={{ mt: { sm: 5 } }}>
                  <Edit />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={handleDeleteDialogOpen}
                  color="error"
                  sx={{ mt: { sm: 5 } }}
                >
                  <Delete />
                </IconButton>
              </Box>
              <DeleteJob
                data={data}
                openDeleteDialog={openDeleteDialog}
                setOpenDeleteDialog={setOpenDeleteDialog}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
