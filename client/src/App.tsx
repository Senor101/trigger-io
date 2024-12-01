import { useEffect, useState } from 'react';
import './App.css';
import { Table } from './components/table';
import socket from './utils/socket.util';

type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
};

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('localhost:5000/users');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    socket.on('update-user', (newData) => {
      setData((prevData) => [...prevData, newData]);
    });

    return () => {
      socket.off('update-user');
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SHADCN</h1>
      <Table data={data} />
    </div>
  );
}

export default App;
