import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import logo from "../../../assets/pdf.png";
import { Box, IconButton, TextField } from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import Delete from "../Delete/Delete";
import sbg from "../../../assets/sbg.jpg";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundImage: `linear-gradient(rgba(34, 42, 69, 0.96), rgba(34, 42, 69, 0.96)), url(${sbg})`,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewAll({ data }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  const formattedDate = moment(data?.createdAt).format("DD-MM-YYYY");
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell sx={{ display: { xs: "none", sm: "block" } }}>
              Caption
            </StyledTableCell>
            <StyledTableCell>File</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data?.map((material, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {formattedDate}
                </StyledTableCell>
                <StyledTableCell>{material?.title}</StyledTableCell>
                <StyledTableCell sx={{ display: { xs: "none", sm: "block" } }}>
                  <TextField
                    value={material?.caption}
                    readOnly
                    rows={3}
                    multiline
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    to={`http://localhost:7000/uploads/materials/${material?.material}`}
                    target="_blank"
                  >
                    <img
                      style={{
                        width: "40px",
                        // height: "10%",
                      }}
                      src={logo}
                      alt=""
                    />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // p: { xs: 1, sm: 3 },
                      // pt: { xs: 2, sm: 3 },
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <IconButton
                      // sx={{ mt: { xs: 2, sm: 5 } }}
                      onClick={handleDeleteDialogOpen}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                    <IconButton component={Link} to={`${material?._id}`}>
                      <EditNoteIcon color="secondary" />
                    </IconButton>
                  </Box>
                </StyledTableCell>
                <Delete
                  openDeleteDialog={openDeleteDialog}
                  setOpenDeleteDialog={setOpenDeleteDialog}
                  data={material}
                />
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell
                align="center"
                sx={{ color: "red" }}
                colSpan={5}
                component="th"
                scope="row"
              >
                No data found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
