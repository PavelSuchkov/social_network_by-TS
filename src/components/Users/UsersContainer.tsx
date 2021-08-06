import React from "react";
import {connect} from "react-redux";
import {
    follow,
    followSuccess,
    UsersInitialType,
    requestUsers,
    setCurrentPage,
    unFollow,
    unFollowSuccess,
    UserType
} from "../../redux/usersPageReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {RootReduxState} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersPage
} from "../../redux/users-selectors";
import avatar from "./../../assets/images/avatar/avatar.png"

type MSTPropsType = {
    users: Array<UserType>
    userPage: UsersInitialType
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
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (id: number) => void
    unFollow: (id: number) => void

}

export type UsersPropsType = MSTPropsType & MDTPropsType


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    // userPhoto = "https://www.freeiconspng.com/uploads/smile-transparent-background-9.png";
    userPhoto = avatar;

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users userPhoto={this.userPhoto}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
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
        users: getUsers(state),
        userPage: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<React.ComponentType>(
    (connect/*<MSTPropsType, MDTPropsType, RootReduxState>*/(mapStateToProps, {setCurrentPage, follow, unFollow, requestUsers})),
    withAuthRedirect
)(UsersContainer)
