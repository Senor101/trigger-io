export const Table = ({ data }: { data: any }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">PhoneNumber</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b">{item.id}</td>
            <td className="py-2 px-4 border-b">{item.name}</td>
            <td className="py-2 px-4 border-b">{item.email}</td>
            <td className="py-2 px-4 border-b">{item.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
