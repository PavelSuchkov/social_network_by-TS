import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./reduxStore";
import {stopSubmit} from "redux-form";
import {usersAPI} from "../api/users-API";
import {profileAPI} from "../api/profile-API";

const ADD_POST = "profile/ADD-POST"
const SET_USER_PROFILE = "profile/SET-USER-PROFILE"
const SET_STATUS = "profile/SET-STATUS"
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS"
const SAVE_PROFILE_CONTACTS = "profile/SAVE_PROFILE_CONTACTS"
const SET_ERROR = "profile/SET_ERROR"


let initialState: InitialProfileStateType = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 3},
        {id: 1, message: 'How r u', likesCount: 5},
        {id: 1, message: 'it\'s my first post', likesCount: 13},
        {id: 1, message: 'Любишь пёсиков? =)', likesCount: 33},
        {id: 1, message: 'London is a capital of great Britain', likesCount: 7},
        {id: 1, message: 'Live Belarus!', likesCount: 345}
    ],
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            github: '',
            instagram: '',
            mainLink: '',
            twitter: '',
            vk: '',
            website: '',
            youtube: '',
        },
        fullName: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',
        photos: {
            large: '',
            small: '',
        },
        userId: 0
    },
    status: '',
    error: null
}

export type InitialProfileStateType = {
    posts: Array<PostType>
    profile: ProfileResponseType | null
    status: string
    error: string | null
    // contacts: ContactsType
    // photos: PhotosType
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileResponseType = {
    aboutMe: string
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos?: {
        large?: string | null
        small?: string | null
    }
    userId: number
}

export type ProfileDataType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    // aboutMe: string
    contacts: ContactsType
    // photos?: PhotosType
}

type ContactsType = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}
export type PhotosType = {
    large?: string | null | undefined
    small?: string | null | undefined
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
                ...state, posts: [ ...state.posts, newPost]
            }
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile, contacts: action.profile.contacts}
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

        case SAVE_PROFILE_CONTACTS: {
            return {
                ...state,
                profile: action.profile,
                contacts: action.profile.contacts
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error
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
    | ReturnType<typeof saveProfileContactsSuccess>
    | ReturnType<typeof setError>

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
export const saveProfileContactsSuccess = (profile: ProfileResponseType) => {
    return {
        type: SAVE_PROFILE_CONTACTS,
        profile
    } as const
}
export const setError = (error: string | null) => {
    return {
        type: SET_ERROR,
        error
    } as const
}

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(data));
    }

export const getUserStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getUserStatus(userId)
        dispatch(setStatus(data));
    }

export const updateUserStatus = (status: string): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
            dispatch(setError(null));
        } else {
            return Promise.reject(data.messages[0])
            // dispatch(setError(response.messages[0]));
        }
    }

export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.updatePhoto(file)
        if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos.large))
        }
    }

export const saveProfile = (profile: ProfileResponseType): ThunkType =>
    async (dispatch, getState) => {
        const id = getState().authorization.id
        let data = await profileAPI.updateProfile(profile);
        if (data.resultCode === 0) {
            let response = await usersAPI.getProfile(id)
            dispatch(setUserProfile(response));
        } else {
            dispatch(stopSubmit("update-profile", {_error: data.messages[0]}) as ActionsType);
            return Promise.reject(data.messages[0]);
        }
    }

export default profilePageReducer;