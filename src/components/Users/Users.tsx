import React, {FC} from "react";
import {FilterType, UserType} from "../../redux/usersPageReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";


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
    onFilterChanged: (filter: FilterType) => void
}

export const Users: FC<UsersPageType> = ({
                                             totalUsersCount, pageSize,
                                             currentPage, onPageChanged,
                                             users, userPhoto,
                                             followingInProgress, follow, unFollow, onFilterChanged
                                         }) => {

    return <div>

        <UsersSearchForm onFilterChanged={onFilterChanged}/>
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

