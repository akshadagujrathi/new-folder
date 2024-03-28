import React from 'react';
import CategoryShop from '../Components/Home/CategoryShop';
import CollectionTab from '../Components/Home/CollectionTab';
const Shop = () => {
    const collections1 = ['all', 'groceries', 'home-decoration'];
    
    return (
        <div className='shop'>
            <CategoryShop />

            <CollectionTab collections={collections1} title = 'Trending'/> {/* Render CollectionTab */}

        </div>
    );
}

export default Shop;
