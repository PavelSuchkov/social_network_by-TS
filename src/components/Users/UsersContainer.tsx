import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType, UserType} from "../../redux/store";
import {Dispatch} from "redux";
import {followActionCreator, setUsersActionCreator, unFollowActionCreator} from "../../redux/usersPageReducer";


let mapStateToProps = (state: AppStateType) => {
    return {
        userPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: number) => {
            dispatch(followActionCreator(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowActionCreator(userId))
        },
        setUsers: (user: UserType) => {
            dispatch(setUsersActionCreator(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)