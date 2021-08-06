import React, {FC} from "react";
import {UserType} from "../../redux/usersPageReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersPageType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void // !!! includenly
    users: Array<UserType>
    userPhoto: string
    followingInProgress: Array<number>
    follow: (id: number) => void
    unFollow: (id: number) => void
}

export const Users: FC<UsersPageType> = ({
                                             totalUsersCount, pageSize,
                                             currentPage, onPageChanged,
                                             users, userPhoto,
                                             followingInProgress, follow, unFollow
                                         }) => {

    return <div>

        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        {
            users.map(u => <User key={u.id}
                                 user={u}
                                 follow={follow}
                                 unFollow={unFollow}
                                 userPhoto={userPhoto}
                                 followingInProgress={followingInProgress}/>)
        }
    </div>

}
