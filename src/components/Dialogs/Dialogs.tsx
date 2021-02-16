import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Mesage";
import {ActionsTypes, DialogPageType} from "../../redux/state";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsPageReducer";

type PropsType = {
    dialogsPage: DialogPageType
    dispatch: (action: ActionsTypes) => void
}

const Dialogs = (props: PropsType) => {
    let dialogsElement = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);
    let newMessageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        debugger
        props.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageBodyCreator(e.currentTarget.value))
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.contentWrapper}>
                <div className={classes.dialogsItems}>
                    {dialogsElement}
                </div>
                <div className={classes.messages}>
                    <div>{messagesElements}</div>
                    <div>
                        <div><textarea value={newMessageBody}
                                       onChange={onNewMessageChange}
                                       placeholder='type message'/></div>
                        <div>
                            <button onClick={onSendMessageClick}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Dialogs;