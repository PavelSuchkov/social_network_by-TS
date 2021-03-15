import React from "react";
import styles from "./Users.module.css";
import {UserType} from "../../redux/store";
import { NavLink } from "react-router-dom";
import axios from "axios";

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
                    <div>
                       <NavLink to={'/profile/' +u.id }> <img className={styles.avatar}
                              src={u.photos.small != null ? u.photos.small : props.userPhoto}
                              alt="smile"/>
                              </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {

                                // props.unFollow(u.id);

                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "77e3abfb-dd75-4904-b56a-e26f0cfa27af"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unFollow(u.id)
                                        }
                                    });


                            }}>UnFollow</button>
                            : <button onClick={() => {

                                // props.follow(u.id);

                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "77e3abfb-dd75-4904-b56a-e26f0cfa27af"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                             props.follow(u.id)
                                        }
                                    });

                            }}>Follow</button> }
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