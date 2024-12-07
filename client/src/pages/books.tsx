import React, { useEffect, useRef, useState } from 'react';
import { Table } from '../components/table';
import { TBook } from '../types/book.types';
const BASE_URL = `http://localhost:8000/books`;

function Book() {
  const [books, setBooks] = useState<TBook[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [currentbookId, setCurrentbookId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    ISBN: '',
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchbooks = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setBooks(data.data);
    };

    fetchbooks();
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
    setFormData({ title: '', ISBN: '', author: '' });
    setMode('create');
    setCurrentbookId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newbook = await response.json();
      setBooks((prev) => [...prev, newbook]);
    } else if (mode === 'update' && currentbookId) {
      const response = await fetch(`${BASE_URL}/${currentbookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updatedbook = await response.json();
      setBooks((prev) =>
        prev.map((book) => (book.id === currentbookId ? updatedbook : book))
      );
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleUpdate = (book: TBook) => {
    setMode('update');
    setCurrentbookId(book.id);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      ISBN: book.ISBN || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (book: TBook) => {
    await fetch(`${BASE_URL}/${book.id}`, { method: 'DELETE' });
    setBooks((prev) => prev.filter((u) => u.id !== book.id));
  };

  return (
    <>
      {/* Create book Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => {
            setIsDialogOpen(true);
            setMode('create');
          }}
        >
          Create book
        </button>
      </div>

      {/* Main Table Section */}
      <div className="mt-4">
        <Table data={books} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={dialogRef}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {mode === 'create' ? 'Create book' : 'Update book'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">ISBN:</label>
                <input
                  type="email"
                  value={formData.ISBN}
                  onChange={(e) =>
                    setFormData({ ...formData, ISBN: e.target.value })
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
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
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

export default Book;
