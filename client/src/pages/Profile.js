import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axiosInstance';
import { message } from 'antd';
import '../resources/profile.css';
function Profile() {
    const [profile, setProfile] = useState('');

    const getDetails = async () => {
        try {
            const response = await axiosInstance.post("http://localhost:5000/api/users/get-user-by-id", {});
            if (response.data.success) {
                setProfile(response.data.data);
            } else {
                message.error('failed to fetch user details');
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

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