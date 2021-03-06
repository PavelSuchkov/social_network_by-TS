import {UserType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1
}
type InitialType = typeof initialState

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
        default:
            return state
    }
}
type ActionsType =
    | ReturnType<typeof followActionCreator>
    | ReturnType<typeof unFollowActionCreator>
    | ReturnType<typeof setUsersActionCreator>
    | ReturnType<typeof setCurrentPageActionCreator>
    | ReturnType<typeof setUsersTotalCountActionCreator>

// export type followActionCreator = ReturnType<typeof followActionCreator>
// export type unFollowActionCreator = ReturnType<typeof unFollowActionCreator>
// export type setUsersActionCreator = ReturnType<typeof setUsersActionCreator>
// export type setCurrentPageActionCreator = ReturnType<typeof setCurrentPageActionCreator>
// export type setUsersTotalCountActionCreator = ReturnType<typeof setUsersTotalCountActionCreator>

export const followActionCreator = (userId: number) => ({ type: FOLLOW, userId} as const)

export const unFollowActionCreator = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const

}

export const setUsersActionCreator = (users: UserType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPageActionCreator = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}

export const setUsersTotalCountActionCreator = (totalUsersCount: number) => ({
    type: SET_TOTAL_COUNT, totalUsersCount: totalUsersCount} as const)

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