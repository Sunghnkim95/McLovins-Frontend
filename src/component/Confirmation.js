import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import CartItem from './CartItem'

const Confirmation = ({cartDisplayNumber, setCartDisplayNumber, userToken, allProducts, allCartItem, isAdmin, setAllCartItem, userId}) => {
  const [updateCart,setUpdateCart] = useState(allCartItem)
  const [totalPrice, settotalPrice] = useState(0)


  return(
    <div>
        <h1>THANK YOU FOR YOUR PURCHASE</h1>
        <h2>Want to continue shopping at McLovin's?</h2>
        <Link to="/product" className="link">
          <li className="navBtn">Click Here</li>
        </Link>
    </div>
)

}
export default Confirmation;