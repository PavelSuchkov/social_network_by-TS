import React from "react";
import styles from "./Users.module.css";
import {UserType} from "../../redux/store";

type UsersPageType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    userPhoto: string
    follow: (userId: number) => void
    unFollow: (userId: number) => void

}

export const Users = (props: UsersPageType) => {


    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for ( let i = 1; i <= pageCount; i++){
        pages.push(i)
    }

    return <div>

        <div>
            {pages.map(p => {
                return <span key={p} className={(props.currentPage === p) ? styles.selectedPage : ''}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div><img className={styles.avatar}

                              src={u.photos.small != null ? u.photos.small : props.userPhoto}
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