import React from "react"; 
import s from "../../Users/Users.module.css";
import preloader from "../../../assets/images/Preloader.gif";

const Preloader = (props) => {
    return (
      <div className={s.load}>
        <img className={s.loader} src={preloader} />
      </div>
    );
}

export default Preloader;