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
    <div className='relative w-full h-full flex flex-row items-start space-x-4 justify-start'>
       <div className='absolute top-2 left-5 text-3xl text-gray-300 font-semibold'>
        Add Product Type
      </div>

        <form  className="max-w-sm w-full mt-20"  onSubmit={handleFormSubmit}>
          <div className="mb-4">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeName">
              Type Name
            </label> */}
            <input
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
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
              className="w-full bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
  );
}

export default TypePage;
