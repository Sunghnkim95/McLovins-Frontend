import {fetchAllProducts, BASE_URL} from '../api';
import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';


const FeaturedProducts = ({allProducts, isAdmin, setselectedProduct}) => {
    return (
        <>
            <div className="fp">
                {allProducts.map(prod => {
                    const {id, name, photo} = prod;
                    return (
                    <div className="featuredContainer" key={id}>
                        <div className="featuredShowBox"onClick={()=>{
                            setselectedProduct(id)
                        }}>  
                            <Link to={`/product/${id}`} className="featuredLink">
                                <img src={photo} alt="a picture of product" className="fpImg" width="200" height="300" />
                            </Link>   
                            <Link to={`/product/${id}`} className="featuredLink">
                                <h2 className="fpName"> {name}</h2>
                            </Link>
                        </div> 
                    </div>)     
                })}
            </div>
        </>
    )
}
export default FeaturedProducts;