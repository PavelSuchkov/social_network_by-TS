import React from "react";
import {connect} from "react-redux";
import {AppStateType, UsersPageType, UserType} from "../../redux/store";
import {Dispatch} from "redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setUsersActionCreator, setUsersTotalCountActionCreator,
    unFollowActionCreator
} from "../../redux/usersPageReducer";
import UsersAPIComponent from "./UsersAPIComponent";

type MSTPropsType = {
    userPage: UsersPageType
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
}

type MDTPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (user: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

export type UsersPropsType = MSTPropsType & MDTPropsType

let mapStateToProps = (state: AppStateType): MSTPropsType => {
    return {
        userPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
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
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountActionCreator(totalCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)