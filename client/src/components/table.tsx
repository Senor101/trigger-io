import { useState } from 'react';

//eslint-disable-next-line
export const Table = <T extends Record<string, any>>({
  data,
  onUpdate,
  onDelete,
}: {
  data: T[];
  onUpdate?: (item: T, setMenuOpen: (x: number | null) => void) => void;
  onDelete?: (item: T) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState<number | null>(null); // Track open menu by row index

  if (!data.length) {
    return <div className="text-gray-500 p-4">No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="border border-gray-200 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {row[header] !== null && row[header] !== undefined
                    ? row[header]
                    : '-'}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                {/* Action Menu */}
                <button
                  onClick={() =>
                    setMenuOpen((prev) => (prev === rowIndex ? null : rowIndex))
                  }
                  className="p-2 hover:bg-gray-100 rounded focus"
                >
                  ⋮
                </button>
                {menuOpen === rowIndex && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={() => onUpdate && onUpdate(row, setMenuOpen)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(row)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
