import axios from "axios";
import React from "react";
import {UsersPageType, UserType} from "../../redux/store";
import {Users} from "./Users.";

type UsersPropsType  = {
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
    setUsers: (user: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    userPage: UsersPageType
    pageSize: number
    totalUsersCount: number
    currentPage: 1 | number
}
class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

     userPhoto = "https://www.freeiconspng.com/uploads/smile-transparent-background-9.png"

    render() {
        return <Users  userPhoto={this.userPhoto}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.userPage.users}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
                       onPageChanged={this.onPageChanged}
                                                            />
    }
}

export default UsersAPIComponent;