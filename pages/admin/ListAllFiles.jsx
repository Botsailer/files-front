import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlforback } from '../../url';

const AdminListFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlforback}api/adminlistfiles`)
      .then((response) => {
        setFiles(response.data.files);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="min-w-full overflow-auto shadow rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              File Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Uploaded By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Modified
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {files.map((file,index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1 ml-4 text-sm font-medium text-gray-900">
                    {file.fileName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {file.uploadedBy}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(file.lastModified).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListFiles;
