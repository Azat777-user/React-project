import React from "react";
import userPhoto from "../../assets/images/user-photo.png";
import {NavLink} from "react-router-dom";
import s from "./Users.module.css";


let User = ({user, followingInProgress, unfollow, follow, key}) => {

  return (
    <div key={key} className={s.wrapper}>
      <span>
        <div className={s.image}>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={
                user.photos.small != null ? user.photos.small : userPhoto
              }
              alt=""
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <input
              className={s.unFollowFollow}
              disabled={followingInProgress.some(id => id === user.id)}
              type="submit"
              value="Unsubscribe"
              onClick={() => {
                unfollow(user.id);
              }}
            />
          ) : (
            <input
              className={s.unFollowFollow}
              disabled={followingInProgress.some(id => id === user.id)}
              type="submit"
              value="Subscribe"
              onClick={() => {
                follow(user.id);
              }}
            />
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.country"}</div>
          <div>{"user.location.city"}</div>
        </span>
      </span>
    </div>
  );  
};

export default User;
