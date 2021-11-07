import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { checkByProduct, updateItemQuantity } from '../api'
import DeleteCartItem from './DeleteCartItem'

const CartItem = ({cartDisplayNumber, setCartDisplayNumber, cartItem, productsToCartItem, allCartItem, userToken, setAllCartItem, updateCart, setUpdateCart, userId}) => {
    const [valueQuant, setValueQuant] = useState(cartItem.item_quantity)
    console.log('cartItem ====>', cartItem);
    const Removehandler = (e)=>{
        e.preventDefault()
        if(valueQuant>0){
        setValueQuant(valueQuant - 1)
        }    
    }
    const Addhandler = (e)=>{
        e.preventDefault()
        setValueQuant(valueQuant + 1)
    }
    async function SubmitHandler (e) {
        e.preventDefault();
        //const cartId = JSON.parse(localStorage.getItem('Cart')).id
        const userId = JSON.parse(localStorage.getItem('userId'))
        //if(!userToken){

        //}

        try{
            const cartItemCheck = await checkByProduct(userToken, cartItem.product_id)
            if(!userToken){
                if(valueQuant <= cartItemCheck.quantity){
                    const countNumbers=[];
                    let sum = 0;
                    console.log(allCartItem,"THIS THE ONE")
                    const theIndex = allCartItem.findIndex((obj=> obj.product_id === cartItem.product_id))
                    allCartItem[theIndex].item_quantity = valueQuant
                    console.log(allCartItem,"updated?")
                    const updateCartItems = allCartItem.map(
                        (item, idx)=>{
                            if(idx===theIndex){
                                item.item_quantity =valueQuant
                                return item
                            }else{
                                return item
                            }
                        }
                    )

                    updateCartItems.map(
                        (item)=>{
                            countNumbers.push(item.item_quantity);
                        }
                    )
                    for(let i=0; i<countNumbers.length; i++){
                        sum += parseInt(countNumbers[i]);
                    }
                    setCartDisplayNumber(sum);
                    localStorage.setItem('cartDisplayNumb', sum)
                    setAllCartItem(updateCartItems)
                    localStorage.setItem('cartItems', JSON.stringify(updateCartItems))

                }else{
                  alert('Calm down!!! We only have '+ cartItemCheck.quantity+' available!')
                }
            }
            else{ if(valueQuant <= cartItemCheck.quantity){
                const updateItemQuant = await updateItemQuantity(userToken, userId, cartItem.id, valueQuant)
                const countNumbers=[];
                let sum = 0;
                const updatedAllCartQuant = allCartItem.map(
                    (item)=>{
                        if (item.product_id === cartItem.product_id){
                            return updateItemQuant[0]
                        } else {
                            return item
                        }
                    }
                )
                updatedAllCartQuant.map(
                    (item)=>{
                        countNumbers.push(item.item_quantity);
                    }
                )
                for(let i=0; i<countNumbers.length; i++){
                    sum += parseInt(countNumbers[i]);
                }
                setCartDisplayNumber(sum);
                localStorage.setItem('cartDisplayNumb', sum)
                setAllCartItem(updatedAllCartQuant);
                localStorage.setItem('cartItems', JSON.stringify(updatedAllCartQuant))
            } else {
                alert('Calm down!!! We only have '+ cartItemCheck.quantity+' available!')
            }
        }
        }
        catch(error){
            console.error(error)
        }
        
    }
    const productlength = productsToCartItem.length>0
    console.log('productsToCartItem', productsToCartItem);
        return (
            <div className="cartContainer" key={cartItem.id}>
            <div className="cartBody">
                <div className="cartHeader">
                <div className="cartDescription">
                    <div className='innerbox'>  
                    <div className='innerboxText' style={{fontWeight:"bolder", color:"black"}}
                        onClick={() => {
                        cartID(cartItem.id)
                        setselectedcart(cartItem.id)
                        }}>
                        <Link to={`/cart/${productlength? productsToCartItem[0].id:1}`} className="cartLink">
                        {productlength? productsToCartItem[0].name:1}
                        </Link>
                    </div>
                    <img className="prodPhoto"src={productlength?productsToCartItem[0].photo:''} alt="a picture of product" width="200" height="250" />
                    <div className='innerboxText'>{productlength?productsToCartItem[0].description:''}</div>
                    <div className='innerboxText'>{productlength?productsToCartItem[0].price:''}</div>
                    <div className='innerboxText'>{productlength?cartItem.item_quantity:''}</div>
                    <form className="addRemoveProduct" onSubmit={(e)=>{
                            SubmitHandler(e)
                        }}>
                        <button className="removeProduct" onClick={e =>Removehandler(e)}><RemoveIcon></RemoveIcon></button>
                        <input type="number" min="1" value={valueQuant} onChange={ event=> {setValueQuant(parseInt(event.target.value))}}></input>
                        <button className="addProduct" onClick={e => Addhandler(e)}><AddIcon></AddIcon></button>
                        <button type="submit">Update</button>
                        <DeleteCartItem
                        userToken={userToken}
                        updateCart={updateCart}
                        setUpdateCart={setUpdateCart}
                        itemToDelete={cartItem}
                        userId={userId}
                        allCartItem={allCartItem}
                        setAllCartItem={setAllCartItem}
                        cartDisplayNumber={cartDisplayNumber}
                        setCartDisplayNumber={setCartDisplayNumber}
                        />
                    </form>
                    </div>
                </div>  
                </div>  
            </div>    
            </div>
        )
    }


export default CartItem;