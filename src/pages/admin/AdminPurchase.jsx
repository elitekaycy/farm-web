import React, { useState, useEffect } from 'react';

function AdminPurchase() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports data from http://localhost:3000/report
    fetch('http://localhost:3000/api/report')
      .then((response) => response.json())
      .then((data) => {
        console.log("report datra" , data)
        setReports(data)})
      .catch((error) => console.error('Error fetching reports:', error));

      
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
      <div className="mt-4">
        {reports && reports.map((report) => (
          <div key={report.reportId} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="text-gray-600 mb-2">Report ID: {report.reportId}</p>
            <p className="text-gray-600 mb-2">User ID: {report.userId}</p>
            <p className="text-gray-600 mb-2">Reported ID: {report.reportedId}</p>
            <p className="text-gray-600 mb-2">Report Type: {report.reportType}</p>
            <p className="text-gray-600 mb-2">Description: {report.description}</p>
            <p className="text-gray-600 mb-2">Created At: {report.createdAt}</p>
            <p className="text-gray-600">Updated At: {report.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPurchase;
