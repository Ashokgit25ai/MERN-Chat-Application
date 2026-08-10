import React, { useEffect, useState } from 'react'
import './profile.css'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { uploadProfilePicture } from '../apiCalls/users';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/loaderSlice';
import { setUser } from '../../redux/userSlice';
import toast from 'react-hot-toast';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);
    const [image, setImage] = useState('');

    const getInitials = () => {
        const firstNameInitial = user?.firstname.toUpperCase()[0];
        const lastNameInitial = user?.lastname.toUpperCase()[0]; 

        return `${firstNameInitial+lastNameInitial}`
    };

    const getFullName = () => {
    const firstName = user?.firstname?.toUpperCase()[0] + user?.firstname?.slice(1).toLowerCase();
    const lastName = user?.lastname?.toUpperCase()[0] + user?.lastname?.slice(1).toLowerCase();

    return `${firstName} ${lastName}`
  };

  const onFileSelect =  (e) => {
    const file = e.target.files[0]

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
        setImage(reader.result);
    }
  }

  const uploadPicture = async () => {
    try{
        dispatch(showLoader());
        const response = await uploadProfilePicture(image)
        dispatch(hideLoader());

        if (response.success) {
            toast.success(response.message);
            dispatch(setUser(response.data));
        }
        else{
            toast.error(response.message);
        }
    }catch{
        toast.error(error.message);
        dispatch(hideLoader());
    }
  };

  useEffect(() => {
    if(user?.profilePic) {
        setImage(user.profilePic)
    }
  }, [user]);


  return (
        <div className='profile-page'>
            <div className="profile-pic-container">
                <div className="profile-pic">
                    {image && <img src={image} alt="profile-pic" className='profile-user-image' />}
                    {!image && <div className='profile-initials'>
                        <h2>{getInitials()}</h2>
                    </div>}
                    <div className='profile-pic-content'>
                        <p>Upload Profile Picture</p>
                        <div className="select-profile-picture-container">
                            <input type="file" id="select-image" onChange={onFileSelect}/>
                            <button className='upload-picture-btn' onClick={uploadPicture}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-info-container">
                <div className="user-details-container">
                    <h2>User Details</h2>

                    <div className="user-detail">
                        <p className="user-detail-label">Name:</p>
                        <p className="user-detail-value">{getFullName()}</p>
                    </div>

                    <div className="user-detail">
                        <p className="user-detail-label">Email:</p>
                        <p className="user-detail-value">{user?.email}</p>
                    </div>

                    <div className="user-detail">
                        <p className="user-detail-label">Created At:</p>
                        <p className="user-detail-value">
                            {moment(user?.createdAt).format("MMM DD YYYY")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

