import React from 'react';
import s from './ProfileInfo.module.css'; 
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Preloader from '../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
  
  if(!props.profile) {
    return <Preloader />; 
  }

  return (
    <div >
        {/* <div className={s.image}>
          <img src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" />
        </div> */}
        <div className={s.descriptionBlock}>
          <img src={props.profile.photos.small} />
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
          <p>{props.profile.fullName}</p>
          <p>{props.profile.aboutMe}</p>
          <p>{props.profile.contacts.facebook}</p>
          <p>{props.profile.lookingForAJobDescription}</p>
        </div>
    </div>
  );
}

export default ProfileInfo;