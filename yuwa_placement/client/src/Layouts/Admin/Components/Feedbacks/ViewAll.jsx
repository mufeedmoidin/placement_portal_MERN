import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import sbg from "../../assets/sbg.jpg";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundImage: `linear-gradient(rgba(34, 42, 69, 0.96), rgba(34, 42, 69, 0.96)), url(${sbg})`,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
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
export default function ViewAll({ allFeedbacks }) {
  const formattedDate = moment(allFeedbacks?.createdAt).format("DD-MM-YYYY");

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell2 align="center" colSpan={4}>
                <Typography fontWeight={"bolder"}>Feedbacks</Typography>
              </StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Student</StyledTableCell>
              <StyledTableCell>Email ID</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFeedbacks?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {formattedDate}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row?.name}
                </StyledTableCell>
                <StyledTableCell>{row?.email}</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    value={row?.message}
                    multiline
                    rows={2}
                    readOnly
                    sx={{ width: "100%" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
