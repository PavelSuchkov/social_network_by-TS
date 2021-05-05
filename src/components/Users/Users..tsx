import React from "react";
import styles from "./Users.module.css";
import {UserType} from "../../redux/usersPageReducer";
import {NavLink} from "react-router-dom";

type UsersPageType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    userPhoto: string
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    followingInProgress: Array<number>
    follow: (id: number) => void
    unFollow: (id: number) => void
}

export const Users = (props: UsersPageType) => {


    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span key={p} className={(props.currentPage === p) ? styles.selectedPage : ''}
                             onClick={() => {props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                       <NavLink to={'/profile/' + u.id}> <img className={styles.avatar}
                                                              src={u.photos.small != null ? u.photos.small : props.userPhoto}
                                                              alt="smile"/>
                              </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {props.unFollow(u.id)}}>UnFollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => {props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}