import React from "react";
import {UsersPageType, UserType} from "../../redux/store";
import styles from './Users.module.css'


type propsType = {
    userPage: UsersPageType,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    setUsers: (user: UserType) => void
}

export const Users = (props: propsType) => {
    return <div>
        {
            props.usersPage.users.map(u => <div key={u.id}>
                <span>
                    <div><img className={styles.avatar}
                              src="https://www.freeiconspng.com/uploads/smile-transparent-background-9.png"
                              alt="smile"/></div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                props.unFollow(u.id)
                            }}>UnFollow</button> :
                            <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.city}</div><div>{u.location.country}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}