import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { removeHiddenPass, removeUserList, removeCurrentEmail, removeCurrentUserToken, removeCurrentUsername, removeIsAdmin, removeUserId, removeCurrentCartItems, removeCurrentCart, removeCurrentCartDisplayNumb }
    from '../auth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";

const Button = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 100px;
  a:visited {
  color: white;
  }
`;
const Header = ({ setMyEmail, userToken, setUserToken, setMyUsername, setIsAdmin, setUserId, cartDisplayNumber, setCartDisplayNumber, setAllCartItem }) => {
    let history = useHistory()

    return (
        <>
            {userToken ?
                <div className="header">
                    <div className="shopName">McLovin's Scents</div>
                    <nav>
                        <ul className="navSection">
                            <Link to="/home" className="link">
                                <li className="navBtn">Home</li>
                            </Link>
                            <Link to="/user/me" className="link">
                                <li className="navBtn">Profile</li>
                            </Link>
                            <Link to="/product" className="link">
                                <li className="navBtn">All Products</li>
                            </Link>
                            <Link to="/cart" className="link">
                                <li className="navBtn"><ShoppingCartIcon></ShoppingCartIcon> {cartDisplayNumber}</li>
                            </Link>
                            <Link to="/order_history" className="link">
                                <li className="navBtn">Order History</li>
                            </Link>
                            <Button>
                                <button className="logOut"
                                    onClick={() => {
                                        setUserToken(removeCurrentUserToken());
                                        setMyUsername(removeCurrentUsername());
                                        setIsAdmin(removeIsAdmin());
                                        setUserId(removeUserId())
                                        setMyEmail(removeCurrentEmail());
                                        setCartDisplayNumber(removeCurrentCartDisplayNumb());
                                        removeCurrentCartItems();
                                        setAllCartItem([]);
                                        removeCurrentCart();
                                        removeCurrentEmail();
                                        removeUserList();
                                        removeHiddenPass();
                                        history.push("/");
                                    }}><LogoutIcon></LogoutIcon> LOGOUT
                                </button>
                            </Button>
                        </ul>
                    </nav>
                </div>
                :
                <div className="header">
                    <div className="shopName">McLovin's Scents</div>
                    <nav>
                        <ul className="navSection">
                            <Link to="/home" className="link">
                                <li className="navBtn">Home</li>
                            </Link>
                            <Link to="/product" className="link">
                                <li className="navBtn">Products</li>
                            </Link>
                            <Link to="/cart" className="link">
                                <li className="navBtn"><ShoppingCartIcon></ShoppingCartIcon>{cartDisplayNumber}</li>
                            </Link>
                            <Link to="/login" className="link">
                                <li className="navBtn"> LOGIN</li>
                            </Link>
                            <Link to="/register" className="link">
                                <li className="navBtn">REGISTER</li>
                            </Link>
                        </ul>
                    </nav>
                </div>

            }
        </>
    )
}
export default Header;