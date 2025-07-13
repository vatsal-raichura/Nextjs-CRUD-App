export interface User {
  id?: string; 
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  role: 'User' | 'Admin' | 'Manager';
  status: 'Active' | 'Inactive';
}
