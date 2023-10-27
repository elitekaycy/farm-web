import React, { useState } from "react";
import toast from "react-hot-toast";

function FarmerPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    location: "",
    gps: "",
    phoneNumber: "",
    email: "",
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const imageFile = e.target.files[0];
      setFormData({ ...formData, image: imageFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

        const jsonData = {
            username: formData.username,
            bio: formData.bio,
            location: formData.location,
            gps: formData.gps,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            image: formData.image
          };

     console.log("formdata", jsonData)

     const response = await fetch('http://localhost:3000/api/farmers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
 

      if (response.ok) {
        const data = await response.json();
        console.log("Farmer created:", data);

        setFormData({
          username: "",
          bio: "",
          location: "",
          gps: "",
          phoneNumber: "",
          email: "",
        });

        setLoading(false)
        toast.success("created farmer successfully")
      } else {
          setLoading(false)
          toast.error(String("error creating form"))
      }
    } catch (error) {
        setLoading(false)
      toast.error(`Error creating farmer: ${error}`);
    }
  };

  return (
    <div className='relative w-full h-full flex flex-row items-start space-x-4 justify-start'>
    <div className='absolute top-2 left-5 text-3xl text-gray-300 font-semibold'>
     Add Farmer
   </div>

        <form className="max-w-sm w-full mt-20" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label> */}
            <input
               className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="username"
              id="username"
              placeholder="add username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bio"
            >
              Bio
            </label> */}
            <textarea
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              name="bio"
              id="bio"
              placeholder="add bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label> */}
            <input
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="location"
              id="location"
              placeholder="add farmer location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gps"
            >
              GPS
            </label> */}
            <input
              className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="gps"
              placeholder="add farmer gps"
              id="gps"
              value={formData.gps}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label> */}
            <input
             className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="add phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label> */}
            <input
               className="w-full border p-2 rounded-md appearance-none focus:outline-green-400"
              type="text"
              name="email"
              id="email"
              placeholder="add farmer email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Add other form fields here as needed */}
          {/* <div className="mb-4">
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
          </div> */}

          <div className="mt-4">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
  );
}

export default FarmerPage;
