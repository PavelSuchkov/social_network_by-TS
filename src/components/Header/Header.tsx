import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (<header className={classes.header}>
            <img className={classes.picture}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjG-JZ1vOhYl5GhS0900uggNYgE6M7qWYNmw&usqp=CAU'/>
        </header>
    )
}

export default Header;