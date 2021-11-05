import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setCartInactive } from '../api'


const Checkout = ({userToken, userId, cartId}) => {

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

    async function SubmitHandler (e) {
        e.preventDefault();
        setCartInactive(userToken, userId, cartId);
    }

    return(
        <div>
            <h3>Billing Address</h3>
                <form onSubmit={(e)=>{SubmitHandler(e)}}>
                    <label for="fname" > Full Name</label>
                    <input type="text" placeholder="Firstname Lastname" value={fullname} onChange={(event) => {
                                setFullname(event.target.value);
                        }}></input>
                    <label for="email"> Email</label>
                    <input type="text" placeholder="Email" value={email} onChange={(event) => {
                                setEmail(event.target.value);
                        }}></input>
                    <label for="email"> Address</label>
                    <input type="text" placeholder="Address" value={address} onChange={(event) => {
                                setAddress(event.target.value);
                        }}></input>
                    <label for="email"> City</label>
                    <input type="text" placeholder="City" value={city} onChange={(event) => {
                                setCity(event.target.value);
                        }}></input>
                    <label for="email"> State</label>
                    <input type="text" placeholder="State" value={state} onChange={(event) => {
                                setState(event.target.value);
                        }}></input>
                    <label for="email"> Zip</label>
                    <input type="text" placeholder="Zip" value={zip} onChange={(event) => {
                                setZip(event.target.value);
                        }}></input>

                <div className="paymentform">
                    <label for="fname"> Name on Card</label>
                    <input type="text" placeholder="Firstname Lastname" value={cardname} onChange={(event) => {
                                setCardname(event.target.value);
                        }}></input>
                    <label for="email"> Credit card number</label>
                    <input type="text" placeholder="1111 2222 3333 4444" value={cardnumber} onChange={(event) => {
                                setCardnumber(event.target.value);
                        }}></input>
                    <label for="email"> Exp Month</label>
                    <input type="text" placeholder="September" value={expmonth} onChange={(event) => {
                                setExpmonth(event.target.value);
                        }}></input>
                    <label for="email"> Exp Year</label>
                    <input type="text" placeholder="2045" value={expyear} onChange={(event) => {
                                setExpyear(event.target.value);
                        }}></input>
                    <label for="email"> CVV</label>
                    <input type="text" placeholder="555" value={cvv} onChange={(event) => {
                                setCvv(event.target.value);
                        }}></input>
                </div>  
                <button type="submit">Confirm Order</button>  
                </form>

        </div>
    )

}
export default Checkout;