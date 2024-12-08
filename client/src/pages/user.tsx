import React, { useEffect, useRef, useState } from 'react';
import { Table } from '../components/table';
import { TUser } from '../types/user.types';
const BASE_URL = `http://localhost:8000/users`;

function User() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setUsers(data.data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsDialogOpen(false);
        resetForm();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const resetForm = () => {
    setFormData({ name: '', email: '', phoneNumber: '' });
    setMode('create');
    setCurrentUserId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
    } else if (mode === 'update' && currentUserId) {
      const response = await fetch(`${BASE_URL}/${currentUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === currentUserId ? updatedUser : user))
      );
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleUpdate = (user: TUser) => {
    setMode('update');
    setCurrentUserId(user.id);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (user: TUser) => {
    await fetch(`${BASE_URL}/${user.id}`, { method: 'DELETE' });
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <>
      {/* Create User Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => {
            setIsDialogOpen(true);
            setMode('create');
          }}
        >
          Create User
        </button>
      </div>

      {/* Main Table Section */}
      <div className="mt-4">
        <Table
          data={users.map((u) => {
            delete u.createdAt;
            delete u.updatedAt;
            u.id = u.id.split('-')[0];
            return u;
          })}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={dialogRef}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {mode === 'create' ? 'Create User' : 'Update User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Phone Number:
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-black p-2 rounded mr-2 hover:bg-gray-400"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  {mode === 'create' ? 'Submit' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
