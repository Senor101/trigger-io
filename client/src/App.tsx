import { useEffect, useState } from 'react';
import './App.css';
import { Table } from './components/table';
import socket from './utils/socket.util';
import { User } from './types/user.types';

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/users');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    socket.on('connection', () => {
      console.log('Connected to server');
    });

    socket.on('user', async () => {
      // Put your refetch logic here
      const response = await fetch('http://localhost:8000/users');
      const result = await response.json();
      setData(result.data);
    });

    return () => {
      socket.off('user');
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Table data={data} />
    </div>
  );
}

export default App;
