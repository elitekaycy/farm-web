
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function ProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    location: '',
    price: 0,
    farmerId: '', // Selected farmer's ID
    typeId: '',    // Selected type's ID
  });

  const [image, setImage] = useState(null)

  const [farmers, setFarmers] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch a list of farmers from the database
    fetch('http://localhost:3000/api/farmers')
      .then((response) => response.json())
      .then((data) => setFarmers(data));

    // Fetch a list of types from the database
    fetch('http://localhost:3000/api/types')
      .then((response) => response.json())
      .then((data) => setTypes(data));

  }, []);


  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const imageFile = e.target.files[0];
      setImage(imageFile)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('description', formData.description)
      submitData.append('quantity', formData.quantity)
      submitData.append('location', formData.location)
      submitData.append('price', formData.price)
      submitData.append('farmerId', formData.farmerId)
      submitData.append('typeId', formData.typeId)
      submitData.append('image', image)
      

      console.log("submit data ", submitData, formData)

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product created:', data);

        setFormData({
          name: '',
          description: '',
          quantity: 0,
          location: '',
          price: 0,
          farmerId: '',
          typeId: '',
          image: null
        });

        toast.success('created product successfully')
      } else {
        console.error('Error creating product:', response.statusText);
        toast.error(`Error creating products `, response.statusText)
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(`Error creating products ${error}`)
    }
  };

  return (
    <div className='relative w-full h-full flex flex-row flex-wrap items-center space-x-4 justify-start'>
       <div className='absolute top-2 left-5 text-3xl text-gray-300 font-semibold'>
        Add Product
      </div>

        <form  className="max-w-lg w-full"  onSubmit={handleFormSubmit}>
          <div className="mb-4">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label> */}
            <input
              placeholder='product name'
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label> */}
            <textarea
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              name="description"
              id="description"
              placeholder='add product description'
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-500 text-sm font-semibold mb-2" htmlFor="quantity">
              Product quantity
            </label>
            <input
             className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label> */}
            <input
               className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="location"
              placeholder='add location'
              id="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
          <label className="text-gray-500 text-sm font-semibold mb-2" htmlFor="quantity">
              Product price
            </label>
            <input
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
          <label className="text-gray-500 text-sm font-semibold mb-2" htmlFor="quantity">
              Select Farmer
            </label>
            <select
               className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              name="farmerId"
              id="farmerId"
              value={formData.farmerId}
              onChange={handleInputChange}
            >
              <option value="">Select a farmer</option>
              {farmers.map((farmer) => (
                <option key={farmer.id} value={farmer.id}>
                  {farmer.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
          <label className="text-gray-500 text-sm font-semibold mb-2" htmlFor="quantity">
              Select Product Type
            </label>
            <select
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              name="typeId"
              id="typeId"
              value={formData.typeId}
              onChange={handleInputChange}
            >
              <option value="">Select a type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              className="w-full"
              type="file"
              name="image"
              id="image"
              accept="image/*" // Restrict to image files
              onChange={handleInputChange}
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

export default ProductPage;
