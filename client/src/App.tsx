import './App.css';
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import User from './pages/user';
import Book from './pages/books';
import { useEffect } from 'react';
import socket from './utils/socket.util';

function App() {
  useEffect(() => {
    socket.on('connect', async () => {
      console.log('Connected to socket server.');
    });
  });

  return (
    <Router>
      <div className="p-4">
        {/* Navigation Bar */}

        <nav className="flex justify-end space-x-4 mb-4">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? 'text-slate-900 p-2 rounded bg-slate-300'
                : 'text-slate-500 p-2 rounded hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300'
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? 'text-slate-900 p-2 rounded bg-slate-300'
                : 'text-slate-500 p-2 rounded hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300'
            }
          >
            Books
          </NavLink>
        </nav>

        {/* Page Routes */}
        <Routes>
          {/* <Route path="/" element={#} /> */}
          <Route path="/users" element={<User />} />
          <Route path="/books" element={<Book />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
