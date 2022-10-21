import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import Sidebar from '../../componets/sidebar/Sidebar';
import { Context } from '../../context/Context';
import './settings.css';
const Settings = () => {
    const { user,dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username, email, password
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
          const res =  await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})

        } catch (err) { 
        dispatch({type:"UPDATE_FAILURE"})

        }
    };
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingUpdateTitle">Update Your Account</span>
                    <span className="settingDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file? URL.createObjectURL(file):PF+user.profilePic}///tu
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}

                            style={{ display: "none" }} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} id="" />
                    <label>Email</label>
                    <input type="text" placeholder={user.email} onChange={e=>setEmail(e.target.value)} id="" />
                    <label>Password</label>
                    <input type="password" onChange={e=>setPassword(e.target.value)} />
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {success&&<span style={{color:"green",textAling:"center",margin:"20px"}}>Profile has been updated</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}

export default Settings;
