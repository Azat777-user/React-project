import React from 'react';
import s from './ProfileInfo.module.css'; 
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Preloader from '../../common/Preloader/Preloader';

const ProfileInfo = ({profile, status, updateStatus}) => {
  
  if(!profile) {
    return <Preloader />; 
  }

  return (
    <div >
        <div className={s.descriptionBlock}>
          <img src={profile.photos.small} />
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          <p>{profile.fullName}</p>
          <p>{profile.aboutMe}</p>
          <p>{profile.contacts.facebook}</p>
          <p>{profile.lookingForAJobDescription}</p>
        </div>
    </div>
  );
}

export default ProfileInfo;