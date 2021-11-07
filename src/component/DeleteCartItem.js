import React from 'react';
import styled from "styled-components";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { BASE_URL } from '../api'
import { DoNotDisturbOnTotalSilenceTwoTone } from '@mui/icons-material';
const Button = styled.button`
  display: flex;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  color: white;
  a:visited {
    color: white;
  }
`;
const DeleteCartItem = ({cartDisplayNumber, setCartDisplayNumber,userToken, updateCart, setUpdateCart, itemToDelete, userId, allCartItem, setAllCartItem}) => {

  const deleteHandler = async () =>{
    const actObj = {
      "cartItemId": itemToDelete.id,
      "userId": userId
    }
    if(!userToken){
      const newCart = allCartItem.filter((cartItem)=>{
        return cartItem.product_id!==itemToDelete.product_id
      })
      localStorage.setItem('cartItems', JSON.stringify(newCart))
      let newCartAmount = 0;
      console.log("newcart!!", newCart)

      newCart.map((item)=>{
        console.log('items', item.item_quantity)
        newCartAmount = newCartAmount + item.item_quantity;
        console.log("newCartAmount", newCartAmount)
      })
      setCartDisplayNumber(newCartAmount)
      localStorage.setItem('cartDisplayNumb', newCartAmount)
      setAllCartItem(newCart);  


    } else{
    const response = await fetch(`${BASE_URL}/cart_items/${itemToDelete.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(
        actObj
      )
    })
    const data = await response.json();
    console.log('outside of if',  data);
    if(data){
      const newCart = allCartItem.filter((cartItem)=>{
        return cartItem.id!==itemToDelete.id
      })
      let newNumber = cartDisplayNumber-data[0].item_quantity
      setCartDisplayNumber(newNumber)
      localStorage.setItem('cartDisplayNumb', newNumber)
      setAllCartItem(newCart);  
    }
  }}
  return (
    <div>
      <Button
        type="button"
        title="Delete Cart Item"
        className="cartItem-delete-btn"
        onClick={() => 
          deleteHandler()
        }
      >
        <DeleteForeverRoundedIcon
          style={{ color: "white", fontSize: 30 }}
        ></DeleteForeverRoundedIcon>{" "}
      </Button>
    </div>
  )
}
export default DeleteCartItem;