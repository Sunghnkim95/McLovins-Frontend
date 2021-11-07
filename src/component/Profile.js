import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Admin from './Admin';
import {editUser, BASE_URL} from '../api'
import EditProfile from './EditProfile';
import OrderHistory from './OrderHistory';


const Profile = ({myUsername, userToken, setMyUsername, isAdmin, myPassword, setMyPassword, myEmail, setMyEmail}) => {
    const [isActiveEdit, setActiveEdit] = useState("false");
    const ToggleClass = () => {
        setActiveEdit(!isActiveEdit);
    };
    let hiddenPassword = '';
    for(let i=0; i<myPassword.length; i++){
        hiddenPassword+="*";
    }
    return (
        <>
            <div className="userInfo">
                <h1>My Profile</h1>
                <div>
                    <div>UserName: {myUsername}</div>
                </div>
                <div>
                    <div>Email: {myEmail}</div>
                </div>
                <div>
                <div>Password: {hiddenPassword}</div> 
                </div>
            </div>

            {myUsername?
                (<div>
                <button className="edit button" 
                onClick={ToggleClass}>
                    Edit
                </button>
            </div>)
            :
            (<div></div>)
            }
        {myUsername
            ?
            (<div className="iaInteractiveBox">
                    <div 
                    className={`editFeild-${isActiveEdit ? "inactive" : "active"}`}
                    >
                        <EditProfile 
                        ToggleClass={ToggleClass}   
                        userToken={userToken}
                            
                        />
                    </div>
            </div>)
            :
            (<div></div>)
            }
            {isAdmin?
            <Admin />
            :
            <div></div>
            }
        <OrderHistory/>
        </>
        )
    }
export default Profile;