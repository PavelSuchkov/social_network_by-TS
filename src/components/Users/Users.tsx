import React, {FC, useEffect} from "react";
import {FilterType, followTC, requestUsers, unFollowTC} from "../../redux/usersPageReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import avatar from "../../assets/images/avatar/avatar.png";


type UsersPageType = {
}

export const Users: FC<UsersPageType> = ({}) => {

    useEffect(() => {
       dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();

    const onPageChanged = (pageNumber: number) => {
       dispatch(requestUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }

    const unFollow = (userId: number) => {
        dispatch(unFollowTC(userId))
    }
    const userPhoto = avatar;

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
        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
    </div>

}

