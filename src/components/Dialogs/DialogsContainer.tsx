import React from 'react';
import {sendMessage, updateNewMessageBody} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


let mapStateToProps = (state: RootReduxState) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
}


export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, {
    sendMessage, updateNewMessageBody
})(Dialogs));
