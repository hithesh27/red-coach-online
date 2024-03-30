import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axiosInstance';
import { message } from 'antd';
import '../resources/profile.css';
import { useSelector } from 'react-redux';
function Profile() {
    const {user} = useSelector((state)=>state.user);
    const profile=user;
    return (
        <div>
            <h1 className="profile-heading">My Profile</h1>
            {profile !== '' &&
                <div className="profile-container">
                    <div className="profile-item">
                        <span className="profile-label">Name:</span> <span className="profile-value">{profile.name}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Email:</span> <span className="profile-value">{profile.email}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Role:</span> <span className="profile-value">{profile.isAdmin === true ? 'Admin' : 'User'}</span>
                    </div>
                </div>
            }
        </div>
    );
}

export default Profile;