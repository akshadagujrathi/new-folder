import React from 'react';
import BannerSlider from '../Components/Home/BannerSlider';
import '../Components/Home/home.css'
import ProductList from '../Components/Home/ProductList';
import CollectionTab from '../Components/Home/CollectionTab';
import CategoryShop from '../Components/Home/CategoryShop';

const Home = () => {
    
    const collections1 = ['all', 'smartphones', 'laptops']; // Define collections
    const collectionnew = ['all', 'fragrances', 'skincare'];
  
    return (
        <div>
            <BannerSlider />
            <ProductList />
            <CategoryShop limit="2"/>

           {/* <CollectionTab Products={filteredProducts}
    
           /> */}
        

<CollectionTab collections={collections1} title = 'Newly Electronic Products'/> {/* Render CollectionTab */}
<CollectionTab  collections={collectionnew} title = 'Skincare' /> {/* Render CollectionTab */}
          
        
     
        
        </div>
    );
}

export default Home;
