import React, { useState, useEffect } from 'react';
import { fetchAllUsers,makeAdmin, removeAdmin, deleteUser} from '../api'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const Admin = ({ userToken }) => {
    useEffect(() => {
        fetchAllUsers(userToken)
            .then((users) => {
                const list = users.users;
                setUsersList(list);
                localStorage.setItem('usersList', JSON.stringify(list));
            })
            .catch(error => console.error(error))
    }, []);
    const [usersList, setUsersList] = useState([localStorage.getItem('usersList')]);
    
    async function makeAdmin(event) {
        event.preventDefault();
        try {
            // const results = await fetchLoginUser(BASE_URL, myUsername, myPassword);
           
        } catch (error) {
            console.error(error);
        }

    }
    async function removeAdmin(event) {
        event.preventDefault();
        try {
            // const results = await fetchLoginUser(BASE_URL, myUsername, myPassword);
           
        } catch (error) {
            console.error(error);
        }

    }
    async function deleteUser(event) {
        event.preventDefault();
        try {
            // const results = await fetchLoginUser(BASE_URL, myUsername, myPassword);
           
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="adminDash">
            {usersList[0] ?
                usersList.map(user => {
                    return (
                        <div className="userBox">
                            <div> Username: {user.username} </div>
                            <div>Email: {user.email} </div>
                            <div> Admin? {user.admin? "Yes":"No"} </div>   
                            <button className="adminBtn"
                            onClick={(event) => { console.log("hello") }}>
                            Yes
                            </button>
                            <button className="adminBtn"
                            onClick={(event) => { console.log("Bye") }}>
                            No
                            </button>
                            <button className="removeUser"
                            onClick={(event) => { console.log("removed") }}>
                            <PersonRemoveIcon />
                            </button>
                        </div>
                    )
                })
                :
                null
            }
        </div>
    )
}
export default Admin;