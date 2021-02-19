import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Mesage";
import {ActionsTypes, DialogPageType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";

type PropsType = {
    dialogsPage: DialogPageType
    dispatch: (action: ActionsTypes) => void
}

export const DialogsContainer = (props: PropsType) => {
 /*   let dialogsElement = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);
    let newMessageBody = props.dialogsPage.newMessageBody;*/

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (text: string) => {
        props.dispatch(updateNewMessageBodyCreator(text))
    }

    return (
        <Dialogs dialogsPage={props.dialogsPage}
                 sendMessage={onSendMessageClick}
                 onNewMessageChange={onNewMessageChange}/>)

}
