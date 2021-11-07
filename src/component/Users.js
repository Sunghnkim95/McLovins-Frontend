import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { checkByProduct, updateItemQuantity } from '../api'
import DeleteCartItem from './DeleteCartItem'

const Users = ({cartDisplayNumber, setCartDisplayNumber, cartItem, productsToCartItem, allCartItem, userToken, setAllCartItem, updateCart, setUpdateCart, userId}) => {
    
    return(
        <div>
            <h1>All Users</h1>
        </div>
    )
}

export default Users;