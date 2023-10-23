
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white p-4 rounded">
        <h1 className="text-2xl mb-4">Create Product</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="w-full border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="w-full border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="w-full border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmerId">
              Select Farmer
            </label>
            <select
              className="w-full border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeId">
              Select Type
            </label>
            <select
              className="w-full"
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

export default ProductPage;
