import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { LuHeart } from "react-icons/lu";
import RangeSlider from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const SingleCollection = () => {
  const [collectionData, setCollectionData] = useState({});
  const { collectionId } = useParams();
  const { cart, dispatch } = useCart();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [brandFilters, setBrandFilters] = useState({});
  const [discountFilter, setDiscountFilter] = useState({ min: 0, max: 100 });
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [averageRating, setAverageRating] = useState(0);
  // const [minRating, setMinRating] = useState(0);

  
  useEffect(() => {
    // Fetch products for a specific category
    fetch(`https://dummyjson.com/products/category/${collectionId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response data
        setCollectionData(data);
        setFilteredProducts(data.products || []);
        // calculateAverageRating(data.products || []);
      })
      .catch(error => console.error('Error fetching collection details:', error));

    // Reset filters
    setPriceRange({ min: 0, max: 10000 });
    setBrandFilters({});
    setDiscountFilter({ min: 0, max: 100 });
  }, [collectionId]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
    applyFilters(value, brandFilters, discountFilter);
  };

  const handleBrandChange = (event) => {
    const { name, checked } = event.target;
    setBrandFilters(prevState => ({ ...prevState, [name]: checked }));
    applyFilters(priceRange, { ...brandFilters, [name]: checked }, discountFilter);
  };

  const handleDiscountClick = (minDiscount, maxDiscount) => {
    setDiscountFilter({ min: minDiscount, max: maxDiscount });
    applyFilters(priceRange, brandFilters, { min: minDiscount, max: maxDiscount });
  };

  const applyFilters = (priceRange, selectedBrandFilters, selectedDiscountRange) => {
    let filtered = collectionData.products || [];
    // Apply price range filter
    filtered = filtered.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);
    // Apply brand filter
    filtered = filtered.filter(product => {
      if (Object.keys(selectedBrandFilters).length === 0) return true; // If no brands selected, return true
      return selectedBrandFilters[product.brand];
    });
    // Apply discount range filter
    if (selectedDiscountRange !== null) {
      filtered = filtered.filter(product => product.discountPercentage >= selectedDiscountRange.min && product.discountPercentage <= selectedDiscountRange.max);
    }
    setFilteredProducts(filtered);
    // calculateAverageRating(filtered);
  };

  // const calculateAverageRating = (products) => {
  //   const totalRating = products.reduce((total, product) => total + product.rating, 0);
  //   const average = totalRating / products.length;
  //   setAverageRating(average.toFixed(2)); // Round to 2 decimal places
  // };

  return (
    <div className='single-collection'>
      <div className='container'>
        <h2>{collectionId}</h2>

       

        <div className='collection-main row d-flex'>
          <div className='col-2'>
             {/* RangeSlider component to select price range */}
             <h5 className='text-left brands my-4'>Price</h5>
        <RangeSlider
          // minValue={0}
          maxValue={10000}
          value={priceRange}
          onChange={handleSliderChange}
        />

        {/* Display selected price range */}
        
        {/* <div>
          <span>${priceRange.min}</span> - <span>${priceRange.max}</span>
        </div> */}

        {/* Brand filter checkboxes */}
        <h5 className='text-left brands my-4'>Brands</h5>
        <div>
          {collectionData.products && Array.from(new Set(collectionData.products.map(product => product.brand))).map(brand => (
            <label className='d-block text-left' key={brand}>
              <input
                type="checkbox"
                name={brand}
                checked={brandFilters[brand] || false}
                onChange={handleBrandChange}
              />
              {brand}
            </label>
          ))}
        </div>

        {/* Discount filter text */}
        <h5 className='text-left brands my-4'>Discount</h5>
        <div>
          <p className='text-left' onClick={() => handleDiscountClick(0, 10)}>0-10% Discount</p>
          <p className='text-left' onClick={() => handleDiscountClick(10, 20)}>10-20% Discount</p>
          <p className='text-left' onClick={() => handleDiscountClick(20, 30)}>20-30% Discount</p>
          {/* Add more options as needed */}
        </div>

        {/* Average rating */}
        {/* <p>Average Rating: {averageRating}</p> */}
          </div>
          <div className='col-9'>
          <div className='row d-flex'>
          {filteredProducts.map(product => (
            <div className="product-card-col col-12 col-md-3 col-lg-3" key={product.id}>
              <div className='product-card'>
                <Link to={`/products/${product.id}`}>
                  <img className="productCard-img img-fluid" src={product.thumbnail} alt={product.title} />
                  <h6 className="text-left productCard-title">{product.title}</h6>
                </Link>
                <p className="text-left"> <span>${product.price}</span></p>
                <LuHeart
                  onClick={() => addToFavorites(product)}
                  className={`heart ${cart.favorites.some((item) => item.id === product.id) ? 'active' : ''}`}
                />
                <button className='d-block' onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SingleCollection;
