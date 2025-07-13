import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { User } from "../types/User";

interface Props {
  initialValues: User;
  onSubmit: (values: User) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be  10 digits")
  .required("Phone is required"),
  age: Yup.number().min(0).required("Age is required"),
  address: Yup.string().required("Address is required"),
  role: Yup.string()
    .oneOf(["User", "Admin", "Manager"])
    .required("Role is required"),
  status: Yup.string()
    .oneOf(["Active", "Inactive"])
    .required("Status is required"),
});

const UserForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const formik = useFormik<User>({
    initialValues,
    validationSchema,
    enableReinitialize: true, 
    onSubmit: async (values, { resetForm }) => {
    await onSubmit(values);  
    resetForm();
    },
    
  });

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        {initialValues.id ? "Edit User" : "Add New User"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={!!formik.errors.name && formik.touched.name}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email && formik.touched.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={!!formik.errors.phone && formik.touched.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Age"
          name="age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={!!formik.errors.age && formik.touched.age}
          helperText={formik.touched.age && formik.errors.age}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={!!formik.errors.address && formik.touched.address}
          helperText={formik.touched.address && formik.errors.address}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={!!formik.errors.role && formik.touched.role}
          helperText={formik.touched.role && formik.errors.role}
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={!!formik.errors.status && formik.touched.status}
          helperText={formik.touched.status && formik.errors.status}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {initialValues.id ? "Update User" : "Create User"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UserForm;
