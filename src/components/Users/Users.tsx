import React, {FC} from "react";
import {FilterType, UserType} from "../../redux/usersPageReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {RootReduxState} from "../../redux/reduxStore";


type UsersPageType = {
    onPageChanged: (pageNumber: number) => void // !!! includenly
    userPhoto: string
    follow: (id: number) => void
    unFollow: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
}

export const Users: FC<UsersPageType> = ({   onPageChanged,
                                            userPhoto,
                                            follow, unFollow, onFilterChanged
                                         }) => {

    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    // const userPhoto = useSelector<RootReduxState, string | null>(state => state.usersPage);

    const dispatch = useDispatch();

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

