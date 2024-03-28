import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryShop = ({ limit }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all categories
    fetch('https://dummyjson.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Ensure categories is an array before using slice
  const limitedCategories = Array.isArray(categories) ? categories.slice(0, limit) : [];

  // Custom JSON for collection images
  const categoryImages = {
    smartphones: 'https://images.unsplash.com/photo-1604212666403-8af98b2081e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    laptops: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fragrances:'https://images.unsplash.com/photo-1543857261-f71238eb4188?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    skincare:'https://images.unsplash.com/photo-1633423411797-9a7317784d2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    groceries:'https://images.unsplash.com/photo-1604742760814-ef2860cc702d?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "home-decoration":'https://images.unsplash.com/photo-1627042493632-fa4d12ff3b01?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    furniture:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tops:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "womens-dresses":'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "womens-shoes":'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "mens-shirts":'https://images.unsplash.com/photo-1567443022715-0d7ad3a48a9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "mens-shoes":'https://images.unsplash.com/photo-1549660299-31c4ea5f34c2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "mens-watches":'https://images.unsplash.com/photo-1611353229944-bcf22ddcdf09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "womens-watches":'https://images.unsplash.com/photo-1658973070905-b4bbbf05750b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "womens-bags":'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "womens-jewellery":'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sunglasses:'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lighting:'https://images.unsplash.com/photo-1581829479109-98ec4ab0d75a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    automotive:'https://images.unsplash.com/photo-1584187167832-c93827c95b6f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    motorcycle:'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // Add more categories and their image URLs
  };

  return (
    <div className='collection-list'>
      <div className='container'>
        <h2>New Collection</h2>
        <div className='row d-flex justify-content-center my-5'>
          {limitedCategories.map(category => (
            <div key={category} className='d-flex justify-content-center align-items-center col-12 col-md-5 col-lg-5 mb-3 collection-card mx-2' style={{
              backgroundImage: `url(${categoryImages[category]})`, // Use the image URL from the custom JSON
              backgroundSize: 'cover',
              // height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Link to={`/collections/${encodeURIComponent(category)}`} className='text-decoration-none'>
                <div
                  className='p-4'
                  
                >
                  <h3 className="text-white text-capitalize mb-0">{category}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryShop;
