import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Mesage";
import {DialogPageType} from "../../redux/state";

type PropsType = {
    state: DialogPageType
}

const Dialogs = (props: PropsType) => {
    let dialogsElement = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.state.messages.map(m => <Message message={m.message}/>);

    return (
        <div className={classes.dialogs}>
            <div className={classes.contentWrapper}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
            </div>
        </div>

    )
}
export default Dialogs;