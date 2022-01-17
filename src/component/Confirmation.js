import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CartItem from './CartItem'

const Confirmation = ({ cartDisplayNumber, setCartDisplayNumber, userToken, allProducts, allCartItem, isAdmin, setAllCartItem, userId }) => {
  const [updateCart, setUpdateCart] = useState(allCartItem)
  const [totalPrice, settotalPrice] = useState(0)
  return (
    <div className="confirmationPage">
      <h1 className="thankyouforpurchase">THANK YOU FOR YOUR PURCHASE !!!</h1>
      <h2 className="continueshopping">Want to continue shopping at McLovin's?</h2>
      <Link to="/product" className="link_confirmation">
        <li className="navBtn_confirmation">Click Here Now!</li>
      </Link>
    </div>
  )
}
export default Confirmation;