import React from 'react';
import { Link } from 'react-router-dom';

const ProductsByCategory = ({CategoryProducts, setselectedProduct, productID}) => {
  return ( 
    <div className="catBox">
    {CategoryProducts.map(prod=> {
      return (
      <Link to={`/product/${prod.id}`} className="prodLink">
        <div className="categoryContainer" key={prod.id}>
          <div className='innerbox'>  
            <div className='innerboxText' style={{fontWeight:"bolder", color:"black"}} onClick={() => {
                productID(prod.id)
                setselectedProduct(prod.id)
            }}>
              {prod.name}
            </div>
            <img className="prodPhoto"src={prod.photo} alt="a picture of product" width="200" height="250" />
            <div className='innerboxText'>{prod.description}</div>
            <div className='innerboxText'>Price: {prod.price}</div>
          </div>
        </div> 
      </Link>
      )
    })}
    </div>
  )
}
export default ProductsByCategory;