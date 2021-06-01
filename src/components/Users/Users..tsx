import React, {FC} from "react";
import styles from "./Users.module.css";
import {UserType} from "../../redux/usersPageReducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "./Paginator";

type UsersPageType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void // !!! includenly
    users: Array<UserType>
    userPhoto: string
    // followSuccess: (userId: number) => void
    // unFollowSuccess: (userId: number) => void
    followingInProgress: Array<number>
    follow: (id: number) => void
    unFollow: (id: number) => void
}

export const Users: FC<UsersPageType> = ({totalUsersCount, pageSize,
                                         currentPage, onPageChanged,
                                         users, userPhoto,
                                         // followSuccess, unFollowSuccess,
                                         followingInProgress, follow,
                                         unFollow}) => {



// export const Users = ({totalUsersCount}):UsersPageType => {


    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        {/*<div>*/}
        {/*    {pages.map(p => {*/}
        {/*        return <span key={p} className={(props.currentPage === p) ? styles.selectedPage : ''}*/}
        {/*                     onClick={() => {props.onPageChanged(p)*/}
        {/*                     }}>{p}</span>*/}
        {/*    })}*/}
        {/*</div>*/}
        <Paginator totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        {
            users.map(u => <div key={u.id}>
                <span>
                    <div>
                       <NavLink to={'/profile/' + u.id}> <img className={styles.avatar}
                                                              src={u.photos.small != null ? u.photos.small : userPhoto}
                                                              alt="smile"/>
                              </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button disabled={followingInProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        unFollow(u.id)
                                    }}>UnFollow</button>

                            : <button disabled={followingInProgress.some(id => id === u.id)}
                                      onClick={() => {
                                          follow(u.id)
                                      }}>Follow</button>}
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