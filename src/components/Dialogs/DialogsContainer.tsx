import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Mesage";
import {ActionsTypes, AppStateType, DialogPageType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import store from "../../redux/reduxStore";

// type PropsType = {
//     store: AppStateType
//     dispatch: (action: ActionsTypes) => void
// }

// export const DialogsContainer = (/*props: PropsType*/) => {
//
//
//     const onSendMessageClick = () => {
//         store.dispatch(sendMessageCreator())
//     }
//
//     const onNewMessageChange = (text: string) => {
//         store.dispatch(updateNewMessageBodyCreator(text))
//     }
//
//     return (
//         <Dialogs dialogsPage={store.getState().dialogsPage}
//                  sendMessage={onSendMessageClick}
//                  onNewMessageChange={onNewMessageChange}/>)
//
// }


let mapStateToProps = (state = store.getState()) =>{
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch = store.dispatch) => {
    return {
        sendMessage: () => {dispatch(sendMessageCreator())},
        onNewMessageChange: (text: string) => {dispatch(updateNewMessageBodyCreator(text))}
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer