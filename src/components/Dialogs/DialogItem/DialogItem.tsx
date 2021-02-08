import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

type propsType = {
    id: number
    name: string
}

const DialogItem = (props: propsType) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <div className={classes.imgWrapper}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ihdk3wfyxmK6F0KYZeZ3D5H96vo74e1LSg&usqp=CAU" alt=""/>
            </div>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;