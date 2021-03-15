import React from "react";
import {connect} from "react-redux";
import {UsersPageType, UserType} from "../../redux/store";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollow
} from "../../redux/usersPageReducer";
import {Users} from "./Users.";
import {Preloader} from "../common/Preloader/Preloader";
import {RootReduxState} from "../../redux/reduxStore";
import {usersAPI} from "../../api/api";

type MSTPropsType = {
    userPage: UsersPageType
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
    isFetching: boolean
}

type MDTPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (user: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersPropsType = MSTPropsType & MDTPropsType



class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        /*axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })*/
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
       /* axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
            withCredentials: true
        })*/
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items)
            });
    }

    userPhoto = "https://www.freeiconspng.com/uploads/smile-transparent-background-9.png"

    render() {
        return <>
            {this.props.userPage.isFetching ? <Preloader/> : null}
            <Users userPhoto={this.userPhoto}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.userPage.users}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
}

const mapStateToProps = (state: RootReduxState): MSTPropsType => {
    return {
        userPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}



export default connect(mapStateToProps, {
    follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching}) (UsersContainer)