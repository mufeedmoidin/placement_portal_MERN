import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { AdContext } from "../Context/AdminContext";
import { Avatar, Box, Button, Typography } from "@mui/material";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { useEffect } from "react";
import moment from "moment";
import sbg from "../assets/sbg.jpg";
import Swal from "sweetalert2";
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

export default function Students() {
  const {
    allStudents,
    setAllStudents,
    getAllStudents,
    updateStudent,
    success,
    setSuccess,
    handleCloseSuccess,
  } = useContext(AdContext);
  useEffect(() => {
    getAllStudents();
  }, []);
  const handleUpdate = async (data, status) => {
    Swal.fire({
      title: "Status updated!",
      text: "Student status updated successfully",
      icon: "success",
    });

    await updateStudent(data, status);
  };
  // console.log(allStudents);
  return (
    <>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Students"}
        title3={"New Post"}
        isTitle2={true}
        isTitle3={false}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell2 align="center" colSpan={8}>
                <Typography fontWeight={"bolder"}>Students</Typography>
              </StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>Register Number</StyledTableCell>
              <StyledTableCell colSpan={2}>Student</StyledTableCell>
              <StyledTableCell>Email ID</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Registered On</StyledTableCell>
              <StyledTableCell colSpan={2}>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStudents?.length > 0 ? (
              allStudents?.map((row, index) => {
                const formattedDate = moment(row?.createdAt).format(
                  "DD-MM-YYYY"
                );
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row?.RegNumber}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Avatar
                        src={`http://localhost:7000/uploads/student/${row?.profile}`}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.name}
                    </StyledTableCell>
                    <StyledTableCell>{row?.email}</StyledTableCell>
                    <StyledTableCell>{row?.phone}</StyledTableCell>
                    <StyledTableCell>{formattedDate}</StyledTableCell>
                    <StyledTableCell>{row?.status}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          // pt: 2,
                        }}
                      >
                        {row?.status == "Active" ? (
                          <Button
                            onClick={() => handleUpdate(row, "Blocked")}
                            color="error"
                            variant="contained"
                          >
                            Block
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUpdate(row, "Active")}
                            color="success"
                            variant="contained"
                          >
                            Unblock
                          </Button>
                        )}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={7}
                  align="center"
                  sx={{ color: "red" }}
                >
                  No Data found!
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
