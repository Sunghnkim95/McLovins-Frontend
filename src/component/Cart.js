import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import CartItem from './CartItem'

const Cart = ({cartDisplayNumber, setCartDisplayNumber, userToken, allProducts, allCartItem, isAdmin, setAllCartItem, userId}) => {
  const [updateCart,setUpdateCart] = useState(allCartItem)
  const [totalPrice, settotalPrice] = useState(0)
  
const isitanarray = Array.isArray(allCartItem)
  useEffect(() => {
    const isitanarray1 = Array.isArray(allCartItem)
    let totalCartPrice = isitanarray1 ? allCartItem.reduce( ( sum, { price, item_quantity } ) => sum + (parseFloat(price) * parseFloat(item_quantity)), 0) : 0
    settotalPrice(totalCartPrice)
    }, [allCartItem]
  )
    
  return ( 
      <div>
        <div>
        {isitanarray ?
        allCartItem.map(cartItem=> {
            const productsToCartItem = [];
            for (let i=0; i<allProducts.length; i++){
              
              if (allProducts[i].id == cartItem.product_id){
                productsToCartItem.push(allProducts[i])
              }
            }
            return (
              <CartItem
              cartItem={cartItem}
              productsToCartItem={productsToCartItem}
              userToken={userToken}
              setAllCartItem={setAllCartItem}
              allCartItem={allCartItem}
              updateCart={updateCart}
              setUpdateCart={setUpdateCart}
              userId={userId}
              cartDisplayNumber={cartDisplayNumber}
              setCartDisplayNumber={setCartDisplayNumber}/>
            )
          })
        :
        "Your Cart is Empty"}
        </div>
        <div>Total: $ {totalPrice}</div>
        <Link to="/checkout" className="link">
          <li className="navBtn">Checkout</li>
        </Link>
        </div>

    )}

export default Cart;