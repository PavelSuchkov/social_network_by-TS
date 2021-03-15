import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import {initialStateSetUserType} from "../../redux/authReducer";

type authPropsType = {
    login: string | null
    isAuth: boolean
    setAuthUserData: (userData: initialStateSetUserType) => void
}

const Header = (props: authPropsType) => {

    return (
        <header className={classes.header}>
            <img className={classes.picture}
                 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjG-JZ1vOhYl5GhS0900uggNYgE6M7qWYNmw&usqp=CAU'/>
            <div className={classes.loginBlock}>
                {props.isAuth? props.login :  <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;