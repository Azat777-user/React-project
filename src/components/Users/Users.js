import React from "react";
import userPhoto from "../../assets/images/user-photo.png";
import {NavLink} from "react-router-dom";
import s from "./Users.module.css";


let Users = props => {
  
  let countPages = Math.ceil(props.totalUsersCount / props.sizePage);
  let pages = [];

  for (let i = 1; i <= countPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {
          pages.map(p => {
            return (
              <span
                className={props.currentPage === p && s.selectedPage}
                onClick={e => {
                  props.onPageChanged(p);
                }}
              >
                {p}
              </span>
            );
          })
        }
      </div>
      {props.users.map(user => {
        return (
          <div key={user.id} className={s.wrapper}>
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
                    disabled={props.followingInProgress.some(id => id === user.id)}
                    type="submit"
                    value="Unfollow"
                    onClick={() => {
                      props.unfollow(user.id);
                    }}
                  />
                ) : (
                  <input
                    disabled={props.followingInProgress.some(id => id === user.id)}
                    type="submit"
                    value="Follow"
                    onClick={() => {
                      props.follow(user.id);
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
      })}
    </div>
  );
};

export default Users;
