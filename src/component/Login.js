import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import {
    BASE_URL,
    fetchLoginUser,
    fetchUsersCartItems,
    fetchAllUsers,
    fetchUsersCart,
    updateItemQuantity,
    createCartItems
} from '../api';

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
`;
const Content = styled.div`
    font-family: "Akaya Telivigala";
    width: 400px;
    padding: 12px;
    min-height: 200px;
    border: black solid 2px;
    box-shadow: 0 2px 12px -8px black;
    border-radius: 2%;
`;
const Heading = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
  border-bottom: 1px solid #888;
  color: red;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
    color:red;
`;
const UserInput = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 200px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
`;
const PassInput = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 201px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
  margin-left: 5px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const FooterButton = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: red;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100px;
  a:visited {
    color: white;
  }
`;
const Login = ({myEmail, setMyEmail, setMyPassword, myPassword, setMyUsername, myUsername, setUserToken, setIsAdmin, userId, setUserId, setAllCartItem, cartDisplayNumber, setCartDisplayNumber, allCartItem}) => {
    console.log("peter is smexy")
    let history = useHistory();
    async function loginUser(event) {
        event.preventDefault();
        try {
            const results = await fetchLoginUser(BASE_URL, myUsername, myPassword);
            const countNumbers=[];
            let sum = 0;
            if(results.user) {
                const token = await results.token;
                const admin = await results.user.admin;
                const userId = await results.user.id
                const myUsername = await results.user.username
                const email = await results.user.email
                setUserToken(token);
                setMyUsername(myUsername);
                setIsAdmin(admin);
                setUserId(userId);
                setMyEmail(email);
                localStorage.setItem('userToken', token);
                localStorage.setItem('isAdmin', admin);
                localStorage.setItem('myUsername', JSON.stringify(myUsername));
                localStorage.setItem('userId', userId);
                localStorage.setItem('email', email);

                fetchUsersCart(results.user.id, token)
                .then((cart) => {
                    localStorage.setItem('Cart', JSON.stringify(cart));
                })                
                .catch(error => console.error(error))

                fetchUsersCartItems(results.user.id, token)
                .then((allCartItem) => {
                    console.log(allCartItem, "loggin")
                    setAllCartItem(allCartItem);
                    localStorage.setItem('cartItems', JSON.stringify(allCartItem));
                    const countNumbers=[];
                    let sum = 0;
                    allCartItem.map(
                        (item)=>{
                            countNumbers.push(item.item_quantity);
                        }
                    )
                    for(let i=0; i<countNumbers.length; i++){
                        sum += parseInt(countNumbers[i]);
                    }
                    setCartDisplayNumber(sum);
                    localStorage.setItem('cartDisplayNumb', sum);
                })
                .catch(error => console.error(error))
                history.push("/");

            } else {
                alert("Your Username Or Password Is Incorrect");
            }
        } catch(error) {
            console.error(error);
        } 

    }
    return (
        <div className="background">
            <Modal>
                <Content>
                    <section className="loginContainer">
                        <Heading>{<h1 className="loginTitle">Login</h1>}</Heading>
                        <Form>    
                                <form className="loginForm" onSubmit={loginUser}>
                                    <div>
                                        <Label>Username:</Label>
                                        <UserInput 
                                            type="username" 
                                            placeholder="Username" 
                                            className="loginInput" 
                                            onChange={(event) => {setMyUsername(event.target.value)}} 
                                        required/>
                                    </div>
                                    <div>
                                        <Label>Password:</Label>
                                        <PassInput type="password" 
                                        placeholder="Password" 
                                        className="loginInput" 
                                        onChange={(event) => {setMyPassword(event.target.value)}} 
                                        required/>
                                    </div>
                                    <Footer>
                                        <FooterButton>
                                            <CheckRoundedIcon
                                                style={{ color: "white", fontSize: 30 }}
                                            ></CheckRoundedIcon>
                                            <Button
                                                variant="contained"
                                                style={{
                                                fontFamily: "Akaya Telivigala",
                                                textDecoration: "none",
                                                backgroundColor: "red",
                                                color: "white",
                                                
                                                }}
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                LOGIN
                                            </Button>
                                        </FooterButton>
                                        <FooterButton>
                                            <CloseRoundedIcon
                                                style={{ color: "white", fontSize: 30 }}
                                            ></CloseRoundedIcon>{" "}
                                            <Link
                                                to="/"
                                                style={{ textDecoration: "none" }}
                                                className="btn btn-primary"
                                                onClick={() => {}}
                                            >
                                                CANCEL
                                            </Link>
                                        </FooterButton>
                                    </Footer>
                    
                                </form>
                        </Form>    
                    </section>
                </Content>
            </Modal>
        </div>
    ) 
}
export default Login; 