import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return(
        <header className={s.header}>
          <img src="https://cdn.worldvectorlogo.com/logos/vk-1.svg" />
            <div className={s.inputSearch}>
              <form className={s.search}>
                <input type="search" 
                  placeholder="Поиск"  
                  autoComplete="off" 
                  className={s.input} 
                />
	              <input type="submit" value="" className={s.submit} />
              </form>
            </div>
            <div className={s.loginBlock}>
              {
                props.isAuth 
                ? <div>
                  {props.login} - <button onClick={props.logout}>Log out</button>
                  </div> 
                : <NavLink to="/login">Login</NavLink>} 
            </div>

        </header>  
    )
}

export default Header;