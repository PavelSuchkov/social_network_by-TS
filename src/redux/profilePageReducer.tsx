import {profileAPI, usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./reduxStore";
import {Dispatch} from "redux";

const ADD_POST = "profile/ADD-POST"
const SET_USER_PROFILE = "profile/SET-USER-PROFILE"
const SET_STATUS = "profile/SET-STATUS"
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS"

let initialState: InitialProfileStateType = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 3},
        {id: 1, message: 'How r u', likesCount: 5},
        {id: 1, message: 'it\'s my first post', likesCount: 13},
        {id: 1, message: 'Любишь пёсиков? =)', likesCount: 33},
        {id: 1, message: 'London is a capital of great Britain', likesCount: 7},
        {id: 1, message: 'Live Belarus!', likesCount: 345}
    ],
    profile: null,
    status: 'My status'
}

export type InitialProfileStateType = {
    posts: Array<PostType>
    profile: ProfileResponseType | null
    status: string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileResponseType = {
    aboutMe: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {
        large: string
        small: string
    }
    userId: number
}


const profilePageReducer = (state: InitialProfileStateType = initialState, action: ActionsType): any => {
    switch (action.type) {

        case ADD_POST: {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [ newPost, ...state.posts]
            }
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        ...state.profile?.photos, large: action.photos
                    }
                }
            }
        }

        default:
            return state
    }
}
type ActionsType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>

export const addPost = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    } as const
}

export const setUserProfile = (profile: ProfileResponseType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}

export const savePhotoSuccess = (photos: string) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    } as const
}
export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
    }

export const getUserStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.getUserStatus(userId)
        dispatch(setStatus(response.data));
    }

export const updateUserStatus = (status: string): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
}

export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
    let response = await profileAPI.updatePhoto(file)
    if(response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos.large))
    }
}

export default profilePageReducer;