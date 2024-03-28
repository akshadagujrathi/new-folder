import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import { useCart } from './CartContext';
import { LuHeart } from "react-icons/lu";

const CollectionTab = ({ collections, title} ) => {
  const [products, setProducts] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const { cart, dispatch } = useCart();

  useEffect(() => {
    // Fetch product data from an external API
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.products.filter(product => {
          return product.category !== 'groceries' && product.id !== 20;
        });
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  
  console.log(products);
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  // Filter products based on the selected collection
  const filteredProducts = selectedCollection === 'all'
    ? shuffle(products).slice(0,4)
    : shuffle(products.filter(product => product.category === selectedCollection));

  return (
    <div className='collection-tab-section py-5'>
      <div className='container'>
        <div className="collection-tabs d-flex align-items-center">
          <span><h2>{title}</h2></span>
          <div className='ml-auto'>  
            {collections.map(collection => (
              <button key={collection} onClick={() => setSelectedCollection(collection)}>
                {collection}
              </button>
            ))}
          </div>
        </div>
          <hr className='mb-4'></hr>
        <div className="product-list row d-flex">
          {filteredProducts.slice(0,4).map(product => (
            <div className="product-card-col col-12 col-md-4 col-lg-3" key={product.id}>
              <div className="product-card position-relative">
                <Link to={`/products/${product.id}`}>
                  <img className="productCard-img img-fluid" src={product.thumbnail} alt={product.title} />
                  <h6 className="text-left productCard-title">{product.title}</h6>
                </Link>
                <LuHeart onClick={() => addToFavorites(product)} className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`} />
                <p className="text-left text-dark">{product.category}</p>
                <p className="text-left"><span>${product.price}</span></p>
                <button className='d-block' onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionTab;

