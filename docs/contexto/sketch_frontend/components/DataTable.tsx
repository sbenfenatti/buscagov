import React from 'react';
import { TableData } from '../types';

interface DataTableProps {
  data: TableData;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const { headers, rows } = data;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-transparent border border-gray-600 rounded-lg">
        <thead className="bg-white/10">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-left py-3 px-4 font-semibold text-gray-300 uppercase text-sm border-b border-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-white/5 border-b border-gray-700 last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;