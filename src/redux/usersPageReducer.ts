// import {UserType} from "./store";

import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-ISFETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS ';


export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    followed: boolean,
    status: string | null
}
/*
export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage:  number
    isFetching: boolean
    followingInProgress: Array<number>
}
*/

 const initialState = {
    users: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}
export type InitialType = typeof initialState

const UsersPageReducer = (state: InitialType = initialState, action: ActionsType): InitialType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            // return {...state, users: [...state.users, ...action.users]}
            return {...state, users: action.users}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}


        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}


        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                 : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state


    }

}
type ActionsType =
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>


// export type followActionCreator = ReturnType<typeof followActionCreator>
// export type unFollowActionCreator = ReturnType<typeof unFollowActionCreator>
// export type setUsersActionCreator = ReturnType<typeof setUsersActionCreator>
// export type setCurrentPageActionCreator = ReturnType<typeof setCurrentPageActionCreator>
// export type setUsersTotalCountActionCreator = ReturnType<typeof setUsersTotalCountActionCreator>

export const follow = (userId: number) => ({type: FOLLOW, userId} as const)

export const unFollow = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const

}
export const setUsers = (users: UserType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_COUNT, totalUsersCount: totalUsersCount
} as const)


export const toggleIsFetching = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING, isFetching: isFetching
} as const)


export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: isFetching, userId
} as const)


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
   return (dispatch: any) => {                                                     //need to fix
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export default UsersPageReducer;
/*      {
          id: 1, followed: false, fullName: 'Pavel', status: 'I\'m studiing now. Do not disturb!!',
          location: {city: 'M.Horka', country: 'Belarus'}
      },
      {
          id: 2, followed: true, fullName: 'Vovka', status: 'Relax! take it easy',
          location: {city: 'Sebastopol', country: 'RF'}
      },
      {
          id: 3, followed: false, fullName: 'Alexey', status: 'Hardly work', location:
              {city: 'M.Horka', country: 'Belarus'}
      },
      {
          id: 5, followed: true, fullName: 'Ivan', status: 'Holidays!!!',
          location: {city: 'Mink', country: 'Belarus'}
      }*/