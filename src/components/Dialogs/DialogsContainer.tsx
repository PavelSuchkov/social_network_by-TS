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


    const onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }

    const onNewMessageChange = (text: string) => {
        props.dispatch(updateNewMessageBodyCreator(text))
    }

    return (
        <Dialogs dialogsPage={props.dialogsPage}
                 sendMessage={onSendMessageClick}
                 onNewMessageChange={onNewMessageChange}/>)

}
