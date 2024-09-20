import React, { useContext, useState } from "react";
import ProductsContext from '../../ContextAPIs/ProductsContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";



const UserManagement = () => {
  const { users, deleteUser, editUser } = useContext(ProductsContext);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
    role: "",
  });
 

  // Start editing a user and populate the form
  const startEditing = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      country: user.country,
      address: user.address,
      gender: user.gender,
      role: user.role,
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to edit the user
  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    editUser(editingUser.id, formData); // Edit user with updated data
    setEditingUser(null); // Reset after editing
  };

  return (
    <div>
      
      <h1 className="text-center h2 text-uppercase text-main fw-semibold my-4">
                User Management
              </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-info ">
              <TableCell  className="fw-bold fs-4">Name</TableCell>
              <TableCell  className="fw-bold fs-4">Email</TableCell>
              <TableCell  className="fw-bold fs-4">Phone</TableCell>
              <TableCell className="fw-bold fs-4">Country</TableCell>
              <TableCell className="fw-bold fs-4">Role</TableCell>
              <TableCell className="fw-bold fs-4">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.role}</TableCell>
             
                <TableCell>
                <div className="row">
                  <div className="col-12 col-lg-5">
                  <Button
                      onClick={() => startEditing(user)}
                      variant="contained"
                    
                      color="primary"
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="col-12 mt-1 mt-lg-0 col-lg-5">
                    <Button
                      onClick={() => deleteUser(user.id)}
                      variant="contained"
                    
                      color="warning"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Render the form only if a user is being edited */}
      {editingUser && (
        <form onSubmit={handleEditSubmit} style={{ marginBlock: "40px" }}>
          <h1 className="text-center h2 text-uppercase text-main fw-semibold">
                Edit User
              </h1>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
