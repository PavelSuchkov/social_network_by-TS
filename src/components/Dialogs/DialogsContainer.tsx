import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootReduxState} from "../../redux/reduxStore";


let mapStateToProps = (state: RootReduxState) =>{
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: () => {dispatch(sendMessageCreator())},
        onNewMessageChange: (text: string) => {dispatch(updateNewMessageBodyCreator(text))}
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer