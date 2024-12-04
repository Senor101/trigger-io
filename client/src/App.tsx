import './App.css';
// import { Table } from './components/table';
// import socket from './utils/socket.util';
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
          <Route path="/users" element={<User />} />
          <Route path="/books" element={<Book />} />
        </Routes>
      </div>
    </Router>
  );
}

// function App() {
//   const [data, setData] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/users');
//         const result = await response.json();
//         setData(result.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//     socket.on('connection', () => {
//       console.log('Connected to server');
//     });

//     socket.on('user', async () => {
//       // Put your refetch logic here
//       const response = await fetch('http://localhost:8000/users');
//       const result = await response.json();
//       setData(result.data);
//     });

//     return () => {
//       socket.off('user');
//     };
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Users</h1>
//       <Table data={data} />
//     </div>
//   );
// }

export default App;
