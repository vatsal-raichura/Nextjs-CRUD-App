import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../components/UserForm';
import { createUser, getUserById, updateUser } from '../services/api';
import { User } from '../types/User';

const FormPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState<User>({
    name: '',
    email: '',
    phone: '',
    age: 0,
    address: '',
    role: 'User',
    status: 'Active',
  });

  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await getUserById(id as string);
          setInitialValues(res.data);
        } catch (err) {
          console.error('Error fetching user:', err);
          alert('Failed to load user.');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (values: User) => {
    try {
      if (id) {
        await updateUser(id as string, values);
        alert('User updated successfully!');
      } else {
        await createUser(values);
        alert('User created successfully!');
      }
      
      router.push('/');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <UserForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default FormPage;
