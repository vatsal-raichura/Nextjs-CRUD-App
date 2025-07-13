import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import UserTable from '../components/UserTable';
import { getUsers } from '../services/api';
import { User } from '../types/User';

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };



  useEffect(() => {
    

    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Link href="/form" passHref>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Add New User
        </Button>
      </Link>

      <UserTable users={users} refreshUsers={fetchUsers}/>
    </Container>
  );
};

export default HomePage;
