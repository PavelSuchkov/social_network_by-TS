import React from "react";
import {connect} from "react-redux";
import {
    follow,
    followSuccess,
    getUsers,
    InitialType,
    setCurrentPage,
    unFollow,
    unFollowSuccess,
    UserType
} from "../../redux/usersPageReducer";
import {Users} from "./Users.";
import {Preloader} from "../common/Preloader/Preloader";
import {RootReduxState} from "../../redux/reduxStore";

type MSTPropsType = {
    users: Array<UserType>
    userPage: InitialType
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MDTPropsType = {
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (id: number) => void
    unFollow: (id: number) => void
}

export type UsersPropsType = MSTPropsType & MDTPropsType


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    userPhoto = "https://www.freeiconspng.com/uploads/smile-transparent-background-9.png"

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users userPhoto={this.userPhoto}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   followSuccess={this.props.followSuccess}
                   unFollowSuccess={this.props.unFollowSuccess}
                   followingInProgress={this.props.followingInProgress}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
            />
        </>
    }
}

const mapStateToProps = (state: RootReduxState): MSTPropsType => {
    return {
        users: state.usersPage.users,
        userPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}



export default connect(mapStateToProps, {
    followSuccess,unFollowSuccess, setCurrentPage, follow, unFollow, getUsers}) (UsersContainer)