
"use client";
import React, { useState } from 'react';

const AddRestaurantPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    image: '',
    rating: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to API
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Restaurant Type"
          value={formData.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Restaurant Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Restaurant Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Restaurant Rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurantPage;