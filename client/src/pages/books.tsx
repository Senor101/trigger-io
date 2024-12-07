import React, { useEffect, useRef, useState } from 'react';
import { Table } from '../components/table';
import { TBook } from '../types/book.types';
const BASE_URL = `http://localhost:8000/books`;

function Book() {
  const [books, setBooks] = useState<TBook[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setBooks(data.data);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current?.contains(event.target as Node)
      ) {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const newUser = await response.json();
    setBooks((prev) => [...prev, newUser]);
    setFormData({ name: '', email: '' });
  };

  return (
    <>
      {/* Create User Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Add Book
        </button>
      </div>

      {/* Main Table Section */}
      <div className="mt-4">
        <Table data={books} />
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div
          className={`${
            // isDialogOpen ? 'fixed' : 'hidden'
            'fixed'
          } inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
        >
          <div
            ref={dialogRef}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Create Book</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium ">Name:</label>
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
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-black p-2 rounded mr-2 hover:bg-gray-400"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Book;
