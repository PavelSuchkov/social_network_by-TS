import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType, UsersPageType, UserType} from "../../redux/store";
import {Dispatch} from "redux";
import {followActionCreator, setUsersActionCreator, unFollowActionCreator} from "../../redux/usersPageReducer";
import UsersCls from "./UsersCls";

type MSTPropsType = {
    userPage: UsersPageType
}

type MDTPropsType = {
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    setUsers: (user: Array<UserType>) => void
}

export type UsersPropsType = MSTPropsType & MDTPropsType

let mapStateToProps = (state: AppStateType): MSTPropsType => {
    return {
        userPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MDTPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followActionCreator(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowActionCreator(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersActionCreator(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersCls)