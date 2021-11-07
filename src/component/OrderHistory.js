import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { fetchOrderHistory } from '../api'

const OrderHistory = ({cartDisplayNumber, setCartDisplayNumber, cartItem, productsToCartItem, allCartItem, userToken, setAllCartItem, updateCart, setUpdateCart, userId}) => {

    const orderhistorylist = fetchOrderHistory();

    return(
        <div>
            <h1>Order History</h1>
            <div>{
      
            }</div>
        </div>
    )
}

export default OrderHistory;