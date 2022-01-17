import React, { useState } from 'react';
import { editUser, BASE_URL } from '../api'

const EditProfile = ({email, userToken, ToggleClass, setMyPassword,setMyEmail }) => {

    const [newPass, setNewPass] = useState("");
    const [newEmail, setNewEmail] = useState(email);

    async function edit(e) {
        e.preventDefault();
        try {
            const results = await editUser(BASE_URL, userToken, newEmail,  newPass,);
            if (results) {
                setMyPassword(newPass);
                setMyEmail(newEmail)
                ToggleClass();
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <section className="editUserAside">
            <h1 className="editUser">Edit User Information</h1>
            <form className="editUserForm"
                onSubmit={(e) => {
                edit(e)
                }}>
                <div className="editUserContent">
                    <label className="editUserLabel">Password:</label>
                </div>
                <div className="editUserContent">
                    <input className="editUserInput" type="password"
                        placeholder="password" value={newPass}
                        onChange={(event) => {
                            setNewPass(event.target.value);
                        }} />
                </div>
                <div className="editUserContent">
                    <label className="editUserLabel">Email:</label>
                </div>
                <div className="editUserContent">
                    <input className="editUserInput" type="email"
                        placeholder="email" value={newEmail}
                        onChange={(event) => {
                            setNewEmail(event.target.value);
                        }} />
                </div>
                <button className="editProdSubmit" type="submit">Update Info!</button>
            </form>
        </section>
    )
}

export default EditProfile;