import React, { useEffect, useState } from 'react';
import { Table } from '../components/table';
import { TUser } from '../types/user.types';
const BASE_URL = `http://localhost:8000/users`;

function User() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // phoneNumber: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setUsers(data.data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const newUser = await response.json();
    setUsers((prev) => [...prev, newUser]);
    setFormData({ name: '', email: '' });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 mb-2"
          />
        </div>
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-2 mb-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create User
        </button>
      </form>
      <Table data={users} />
    </>
  );
}

export default User;
