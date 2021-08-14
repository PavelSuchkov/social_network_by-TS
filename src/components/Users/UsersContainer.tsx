import React from "react";
import {connect} from "react-redux";
import {
    FilterType,
    follow,
    requestUsers,
    setCurrentPage,
    unFollow,
    UsersInitialType,
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
    getUsersFilter,
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
    filter: FilterType
}

type MDTPropsType = {
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (id: number) => void
    unFollow: (id: number) => void

}

export type UsersPropsType = MSTPropsType & MDTPropsType


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize, this.props.filter)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.requestUsers(1, this.props.pageSize, filter)
    }

    userPhoto = avatar;

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users userPhoto={this.userPhoto}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onFilterChanged={this.onFilterChanged}
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
        filter: getUsersFilter(state)
    }
}

export default compose<React.ComponentType>(
    (connect/*<MSTPropsType, MDTPropsType, RootReduxState>*/(mapStateToProps, {
        setCurrentPage,
        follow,
        unFollow,
        requestUsers
    })),
    withAuthRedirect
)(UsersContainer)
