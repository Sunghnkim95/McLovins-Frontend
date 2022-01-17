import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setCartInactive, createOrderHistory, createNewCart, checkAnonymousUser, createCartItems } from '../api'
import { removeCurrentCartItems } from '../auth'
import Confirmation from './Confirmation'

const Checkout = ({ userToken, userId, setAllCartItem }) => {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [cardname, setCardname] = useState('')
    const [cardnumber, setCardnumber] = useState('')
    const [expmonth, setExpmonth] = useState('')
    const [expyear, setExpyear] = useState('')
    const [cvv, setCvv] = useState('')
    const confirmation = useHistory();

    async function nonUserCheckout(userId) {
        const checkoutAnon = await checkAnonymousUser(fullname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv);
        const newCart = await createNewCart(checkoutAnon.token, checkoutAnon.userId, email, address, city, state, zip);
        const storageCartItems = JSON.parse(localStorage.getItem('cartItems'))
        for (let i = 0; i < storageCartItems.length; i++) {
            const createItem = await createCartItems(checkoutAnon.token, newCart.id, storageCartItems[i].product_id, storageCartItems[i].item_quantity, storageCartItems[i].price, checkoutAnon.userId);
        }
        const setInactive = await setCartInactive(checkoutAnon.token, checkoutAnon.userId, newCart.id);
        const createOH = await createOrderHistory(checkoutAnon.token, checkoutAnon.userId, newCart.id, fullname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv);
    }
    const cartId = localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')).id : null
    async function SubmitHandler(e) {
        e.preventDefault();
        if (!userToken) {
            nonUserCheckout();
            setAllCartItem(removeCurrentCartItems())
            confirmation.push('/confirmation')
        } else {
            setCartInactive(userToken, userId, cartId);
            createOrderHistory(userToken, userId, cartId, fullname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv);
            const newCart = await createNewCart(userToken, userId, email, address, city, state, zip);
            localStorage.setItem('Cart', JSON.stringify(newCart));
            confirmation.push('/confirmation')
        }
    }

    return (
        <div className='checkout_whole'>
            <form className='whole_form' onSubmit={(e) => {
                SubmitHandler(e)
            }}>
                <h3 className='billing_txt'>Billing Address</h3>

                <label for="fname" className='checkout_label'> Full Name</label>
                <input type="text" placeholder="Firstname Lastname" className='checkout_input' value={fullname} onChange={(event) => {
                    setFullname(event.target.value);
                }}></input>
                <label for="email" className='checkout_label'> Email</label>
                <input type="text" placeholder="Email" className='checkout_input' value={email} onChange={(event) => {
                    setEmail(event.target.value);
                }}></input>
                <label for="email" className='checkout_label'> Address</label>
                <input type="text" placeholder="Address" className='checkout_input' value={address} onChange={(event) => {
                    setAddress(event.target.value);
                }}></input>
                <label for="email" className='checkout_label'> City</label>
                <input type="text" placeholder="City" className='checkout_input' value={city} onChange={(event) => {
                    setCity(event.target.value);
                }}></input>
                <label for="email" className='checkout_label'> State</label>
                <input type="text" placeholder="State" className='checkout_input' value={state} onChange={(event) => {
                    setState(event.target.value);
                }}></input>
                <label for="email" className='checkout_label'> Zip</label>
                <input type="text" placeholder="Zip" className='checkout_input' value={zip} onChange={(event) => {
                    setZip(event.target.value);
                }}></input>

                <div className="payment_form">
                <h3 className='billing_form'>Card Information</h3>
                    <label for="fname" className='checkout_label'> Name on Card</label>
                    <input type="text" placeholder="Firstname Lastname" className='checkout_input' value={cardname} onChange={(event) => {
                        setCardname(event.target.value);
                    }}></input>
                    <label for="email" className='checkout_label'> Credit card number</label>
                    <input type="text" placeholder="1111 2222 3333 4444" className='checkout_input' value={cardnumber} onChange={(event) => {
                        setCardnumber(event.target.value);
                    }}></input>
                    <label for="email" className='checkout_label'> Exp Month</label>
                    <input type="text" placeholder="11" className='checkout_input' value={expmonth} onChange={(event) => {
                        setExpmonth(event.target.value);
                    }}></input>
                    <label for="email" className='checkout_label'> Exp Year</label>
                    <input type="text" placeholder="2045" className='checkout_input' value={expyear} onChange={(event) => {
                        setExpyear(event.target.value);
                    }}></input>
                    <label for="email" className='checkout_label'> CVV</label>
                    <input type="text" placeholder="555" className='checkout_input_last' value={cvv} onChange={(event) => {
                        setCvv(event.target.value);
                    }}></input>
                </div>
                <button type="submit" className='checkout_confirmbtn'>Confirm Order</button>
                {/* <Confirmation/> */}
            </form>

        </div>
    )

}
export default Checkout;