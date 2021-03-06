import axios from "axios";
import React from "react";
import styles from './Users.module.css';
import {UsersPageType, UserType} from "../../redux/store";

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
class Users extends React.Component<UsersPropsType> {

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

    render() {
debugger
        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for ( let i = 1; i <= pageCount; i++){
            pages.push(i)
        }

        return <div>

            <div>
                { pages.map( p => {
                 return  <span key={p} className={(this.props.currentPage === p)?  styles.selectedPage : ''}
                 onClick={() => {this.onPageChanged(p)} }>{p }</span>})}
            </div>
            {
                this.props.userPage.users.map(u => <div key={u.id}>
                <span>
                    <div><img className={styles.avatar}
                              src="https://www.freeiconspng.com/uploads/smile-transparent-background-9.png"
                              alt="smile"/></div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                this.props.unFollow(u.id)
                            }}>UnFollow</button> :
                            <button onClick={() => {
                                this.props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        {/*<div>{u.location.city}</div><div>{u.location.country}</div>*/}
                    </span>
                </span>
                </div>)
            }
        </div>
    }
}

export default Users;