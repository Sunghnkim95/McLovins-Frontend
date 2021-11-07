import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import MakeProduct from './MakeProduct';
import ProductsByCategory from './CategoryProducts'
const Header = styled.header`
  font-family: "Akaya Telivigala", cursive;
  font-weight: 100;
  font-style: italic;
  font-size: 20px;
  text-align: center;
  padding: 0.25em 0;
  text-decoration: underline;
`;
const Container = styled.header`
`;
const Products = ({userToken, isAdmin, allProducts, setAllProducts, setselectedProduct, productID}) => {
  const categoryCandles = allProducts.filter(products => products.category === "candle");
  const categoryLotions = allProducts.filter(products => products.category === "lotion");
  const categoryColognes = allProducts.filter(products => products.category === "cologne");
  const categoryOils = allProducts.filter(products => products.category === "essential oils");
  const categoryIncense = allProducts.filter(products => products.category === "incense");
  return ( 
    <Container>
      <Header><h1>All Products</h1></Header>
      <div className="allProducts">
        <div className="products">
          {isAdmin?
            (<div className="productContainer">
              <MakeProduct
                userToken={userToken}
                allProducts={allProducts}
                setAllProducts={setAllProducts}/>
            </div>)
            : 
            (<div></div>)
          }
          
          <div className='category'>
          Candles
          <ProductsByCategory
          CategoryProducts={categoryCandles}
          productID={productID}
          setselectedProduct={setselectedProduct}
          />
          </div>
          <div className='category'>
          Lotions
          <ProductsByCategory
          CategoryProducts={categoryLotions}
          productID={productID}
          setselectedProduct={setselectedProduct}
          />
          </div>
          <div className='category'>
          Colognes/Perfumes
          <ProductsByCategory
          CategoryProducts={categoryColognes}
          productID={productID}
          setselectedProduct={setselectedProduct}
          />
          </div>
          <div className='category'>
          Essential Oils
          <ProductsByCategory
          CategoryProducts={categoryOils}
          productID={productID}
          setselectedProduct={setselectedProduct}
          />
          </div>
          <div className='category'>
          Incense
          <ProductsByCategory
          CategoryProducts={categoryIncense}
          productID={productID}
          setselectedProduct={setselectedProduct}
          />
          </div>
        </div>
      </div>
    </Container>
  )
}
export default Products;