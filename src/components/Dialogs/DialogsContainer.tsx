import React from 'react';
import {sendMessage/*, updateNewMessageBody*/} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";



let mapStateToProps = (state: RootReduxState) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage/*, updateNewMessageBody*/}),
    withAuthRedirect
)(Dialogs)

