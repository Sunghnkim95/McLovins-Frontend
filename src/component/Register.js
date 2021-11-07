import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import {
    BASE_URL,
    fetchRegisterUser
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
const Input = styled.input`
height: 1.5rem;
background: #ddd;
width: 400px;
padding: 8px;
font-size: 22px;
margin-bottom: 8px;
`;
const UserInput = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 200px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
`;
const EmailInput = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 200px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
  margin-left: 29px;
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
const ConfirmInput = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 201px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
  margin-left: 13px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const FooterButton = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: red;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 100px;
  a:visited {
    color: white;
  }
`;
const Register = ({setUserToken, setMyPassword, myPassword, setMyUsername, myUsername, myEmail, setMyEmail}) => {
    const [confirMmyPassword, setConfirmMyPassword] = useState('');
    let history = useHistory();
    async function registerUser(event) {
        event.preventDefault();
        if (myPassword.length < 8) {
             alert("Password Must Be At Least 8 Characters");
        } else if (myPassword !== confirMmyPassword){
           alert("please make sure your passwords match");
        }else{
            try {
                const results = await fetchRegisterUser(BASE_URL, myUsername, myPassword, myEmail);
                console.log(myUsername);
                console.log(myPassword);
                console.log(myEmail);

                if(results) {
                    const token = await results.token;
                    setUserToken(token);
                    setMyUsername(myUsername);
                    setMyEmail(myEmail)
                    localStorage.setItem('userToken', token);
                    localStorage.setItem('myUsername', JSON.stringify(myUsername));
                    localStorage.setItem('myEmail', JSON.stringify(myEmail));
                    history.push("/");
                    alert("Good News, You're Registered!")
                    location.reload();
                } else {
                }
            }catch(error) {
                console.error(error);
            }   
        }  
    }
    return (
        <Modal>
            <Content>
                <section className="registerContainer">
                    <Heading>{<h1 className="registerTitle">Register</h1>}</Heading>
                    <Form>
                        <form className="registerForm"onSubmit={registerUser}>
                        <div>
                            <Label>Username:</Label>
                            <UserInput type="username" 
                                placeholder="Username" 
                                className="registerInput"
                                onChange={(event) => {setMyUsername(event.target.value)}} 
                                required/>
                        </div>
                        <div>
                            <Label>Email:</Label>
                            <EmailInput type="email" 
                                placeholder="Email" 
                                className="registerInput"
                                onChange={(event) => {setMyEmail(event.target.value)}} 
                                required/>
                        </div>
                        <div>
                            <Label>Password:</Label>
                            <PassInput type="password" 
                                placeholder="Password" 
                                className="registerInput"
                                onChange={(event) => {setMyPassword(event.target.value)}} 
                                required/>
                        </div>
                        <div>
                            <Label>Confirm:</Label>
                            <ConfirmInput type="password" 
                                placeholder="Confirm Password" 
                            className="registerInput"
                            onChange={(event) => {setConfirmMyPassword(event.target.value)}} 
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
                                    textDecoration: "none",
                                    backgroundColor: "red",
                                    color: "white",
                                    fontFamily: "Akaya Telivigala",
                                    }}
                                    className="btn btn-primary"
                                    type="submit"
                                    >
                                        Register
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
    )
}
export default Register; 