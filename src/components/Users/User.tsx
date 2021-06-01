import React, {FC} from "react";
import styles from "./Users.module.css";
import {UserType} from "../../redux/usersPageReducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "./Paginator";

type UserPageType = {
    userPhoto: string
    followingInProgress: Array<number>
    follow: (id: number) => void
    unFollow: (id: number) => void
    user: UserType
}

export const User: FC<UserPageType> = ({user,  userPhoto, followingInProgress, follow, unFollow}) => {


    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}> <img className={styles.avatar}
                                                                 src={user.photos.small != null ? user.photos.small : userPhoto}
                                                                 alt="smile"/>
                              </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unFollow(user.id)
                                    }}>UnFollow</button>

                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div><div>{user.status}</div>
                    </span>
                </span>
        </div>)

}