// ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import { useCart } from './CartContext';
import { LuHeart } from "react-icons/lu";
// ... (imports and other code)

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cart, dispatch } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        // Filter out products with the "groceries" category
        const filteredProducts = data.products.filter(product => {
          return product.category !== 'groceries' && product.id !== 20;
        });
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  const shuffledProducts = shuffle(products).slice(0,8);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const addToFavorites = (product) => {
    console.log('Adding to favorites:', product);
    const isFavorite = cart.favorites.some((item) => item.id === product.id);

    if (isFavorite) {
      // Product is already in favorites, remove it
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product });
    } else {
      // Product is not in favorites, add it
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    }
  };

  return (
    <div className='section' id="product-grid">
      <div className="container">
        <h2>Best Selling</h2>
        <div className="product-list row d-flex">
          {shuffledProducts.map(product => (
            <div className="product-card-col col-12 col-md-3 col-lg-3" key={product.id}>
              <div className='product-card position-relative'>
                <Link to={`/products/${product.id}`}>
                  <img className="productCard-img img-fluid" src={product.thumbnail} alt={product.title} />
                  <span><h6 className="text-left productCard-title">{product.title}</h6></span>
                </Link>

                <LuHeart onClick={() => addToFavorites(product)} className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`} />

                <p className="text-left text-dark">{product.category}</p>

                <p className="text-left"> <span>${product.price}</span></p>

                <button className='d-block btn-primary' onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
