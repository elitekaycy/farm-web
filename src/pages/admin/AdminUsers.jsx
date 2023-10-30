import React, { useState, useEffect } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your API
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="relative w-full h-full flex flex-row space-x-4 justify-center">
      <div className="absolute top-2 left-5 text-5xl text-gray-300 font-semibold">
        Users
      </div>

      <div className="w-full mt-20">
        <ul className="divide-y divide-gray-300">
          {users.map((user, index) => (
            <li
              key={index}
              className="bg-white shadow-sm flex-row justify-between p-4 rounded-lg my-2 flex items-center"
            >
              <div className="text-lg font-semibold text-gray-800">
                {user.username}
              </div>
              <div className="text-gray-600 ml-2">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminUsers;
