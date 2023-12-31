import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../header/Navbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Swal from "sweetalert2";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Users = () => {
  // Loader and user State
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDeleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = users.filter((user) => user._id !== _id);
              setUsers(remaining);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <Container sx={{ marginTop: "60px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <StyledTableRow key={row?._id}>
                  <StyledTableCell component="th" scope="row">
                    {row?.firstName + " " + row.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row?.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.isActive}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row?.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.gender}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDeleteUser(row?._id)}
                    align="center"
                  >
                    <DeleteIcon />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link style={{ color: "black" }} to={`/users/${row._id}`}>
                      <DriveFileRenameOutlineIcon />
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Users;
