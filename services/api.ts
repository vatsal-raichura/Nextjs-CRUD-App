
import axios from 'axios';
import { User } from '../types/User';

const BASE_URL = 'https://68735480c75558e27353e579.mockapi.io/users/users';

export const getUsers = () => axios.get<User[]>(BASE_URL);

export const getUserById = (id: string) => axios.get<User>(`${BASE_URL}/${id}`);

export const createUser = (user: User) => axios.post<User>(BASE_URL, user);

export const updateUser = (id: string, user: User) =>
  axios.put<User>(`${BASE_URL}/${id}`, user);

export const deleteUser = (id: string) => axios.delete(`${BASE_URL}/${id}`);
