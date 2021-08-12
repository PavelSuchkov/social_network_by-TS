import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./reduxStore";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-API";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'users/SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-ISFETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS ';


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

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // Array of usersId
}
export type UsersInitialType = typeof initialState

export const UsersPageReducer = (state: UsersInitialType = initialState, action: ActionsType): UsersInitialType => {
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
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>

export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const)

export const unFollowSuccess = (userId: number) => {
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
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
} as const)

export type ThunkType = ThunkAction<Promise<void>, RootReduxState, unknown, ActionsType>
// export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>


export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage))
    }
}

// const followUnfollowFlow = async (dispatch: Dispatch, id: number,
//                                   apiMethod: (id: number) => any,
//                                   actionCreator: (id: number) => ActionsType) => {
//     dispatch(toggleFollowingInProgress(true, id));
//     const response = await apiMethod(id)
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(id))
//     }
//     dispatch(toggleFollowingInProgress(false, id));
// }
//
// export const follow1 = (id: number) => {
//     return async (dispatch: Dispatch) => {
//         followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), followSuccess)
//     }
// }
//
// export const unFollow1 = (id: number) => {
//     return async (dispatch: Dispatch) => {
//         followUnfollowFlow(dispatch, id, usersAPI.unFollow.bind(usersAPI), unFollowSuccess)
//     }
// }

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, id));
        let response = await usersAPI.follow(id)
        if (response.resultCode === 0) {
            dispatch(followSuccess(id))
        }
        dispatch(toggleFollowingInProgress(false, id));
    }
}
export const unFollow = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, id));
        let response = await usersAPI.unFollow(id)
        if (response.resultCode === 0) {
            dispatch(unFollowSuccess(id))
        }
        dispatch(toggleFollowingInProgress(false, id));
    }
}

export default UsersPageReducer;
