import React, { useEffect, useState } from 'react'

function UserReport() {
    const [reports, setReports] = useState([])

    useEffect(() => {

        fetch(`http://localhost:3000/api/orders/USER_REPORT`)
        .then((response) => response.json())
        .then((data) => {
          console.log("REPORTS are ", data);
          setReports(data);
        });
  
    }, [])

    const reportProcess = (report) => {
        const splitReport = report.split("#")

        return {
            name: splitReport[0],
            desc: splitReport[1],
            email: splitReport[2]
        }
    }

    const ListItem = ( report ) => {
        console.log("report in list item ", report)
        return (
          <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full">
            <h2 className="text-xl font-semibold">{report.report.name}</h2>
            <p className="text-gray-600">{report.report.email}</p>
            <p className="mt-2">{report.report.desc}</p>
          </div>
        );
      };

    return (
        <div className='relative w-full h-full flex flex-row items-center space-x-4 justify-center'>
          <div className='absolute top-2 left-5 text-5xl text-gray-300 font-semibold'>
            User Reports
          </div>

          <div className='flex flex-col space-y-3 max-w-xl w-full'>
            {reports && reports.map(r => <ListItem key={r.reportId} report={reportProcess(r.description)} /> )}
          </div>
    
    
        </div>
      )
}

export default UserReport