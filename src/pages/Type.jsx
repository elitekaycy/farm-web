import React, { useState } from 'react';
import toast from 'react-hot-toast';

function TypePage() {
    const [name, setName] = useState('')


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Type created:', data);

        setName('')
        toast.success("successfully created type")
      } else {
        console.error('Error creating type:', response.statusText);
        toast.error(`Error creating type ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error creating type:', error);
      toast.error(`Error creating type ${error}`)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white p-4 rounded">
        <h1 className="text-2xl mb-4">Create Type</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeName">
              Type Name
            </label>
            <input
              className="w-full focus:outline-none"
              type="text"
              name="typeName"
              id="typeName"
              placeholder='add type of product'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TypePage;
