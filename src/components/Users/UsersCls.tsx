import axios from "axios";
import React from "react";
import styles from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";


class Users extends React.Component<UsersPropsType>{
    getUsers = () => {
        if (this.props.userPage.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }
    render() {
        return <div>
            <button onClick={this.getUsers}>Get Users</button>
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