import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import User from './pages/user';
import Book from './pages/books';

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navigation Bar */}
        <nav className="flex justify-end space-x-4 mb-4">
          <Link
            to="/users"
            className="text-slate-500 p-2 rounded hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300"
          >
            Users
          </Link>
          <Link
            to="/books"
            className="text-slate-500 p-2 rounded hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300"
          >
            Books
          </Link>
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
