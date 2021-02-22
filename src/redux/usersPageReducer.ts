import {ActionsTypes, UsersPageType, UserType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';


let initialState = {
    users: [
        {
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
        },
    ]
}

const UsersPageReducer = (state: UsersPageType = initialState, action: ActionsTypes) => {
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
            return {...state, users: [...state.users, action.user]}

        default:
            return state
    }
}
export type followActionCreator = ReturnType<typeof followActionCreator>
export type unFollowActionCreator = ReturnType<typeof unFollowActionCreator>
export type setUsersActionCreator = ReturnType<typeof setUsersActionCreator>

export const followActionCreator = (userId: number) => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}
export const unFollowActionCreator = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const

}

export const setUsersActionCreator = (user: UserType) => {
    return {
        type: SET_USERS,
        user: user
    } as const
}

export default UsersPageReducer;