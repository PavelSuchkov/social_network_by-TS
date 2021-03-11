import state, {PostType, ProfilePageType} from "./store";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET-USER-PROFILE"

let initialState = {
        posts: [
            {id: 1, message: 'Hi', likesCount: 3},
            {id: 1, message: 'How r u', likesCount: 5},
            {id: 1, message: 'it\'s my first post', likesCount: 13},
            {id: 1, message: 'Любишь пёсиков? =)', likesCount: 33},
            {id: 1, message: 'London is a capital of great Britain', likesCount: 7},
            {id: 1, message: 'Live Belarus!', likesCount: 345}
        ],
        newPostText: '',
        profile: null
}

const profilePageReducer = (state: ProfilePageType = initialState, action: ActionsType) => {

    switch (action.type) {

        case UPDATE_NEW_POST_TEXT:{
            return {
                ...state,
                newPostText: action.newText
            }
        }

        case ADD_POST:{
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }

        case SET_USER_PROFILE: {
           return  {...state, profile: action.profile}
        }
        default:
            return state
    }
}
type ActionsType =
    | ReturnType<typeof addPostCreator>
    | ReturnType<typeof updateNewPostCreator>
    | ReturnType<typeof setUserProfileCreator>

export const addPostCreator = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    }as const
}

export const updateNewPostCreator = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }as const
}

export const setUserProfileCreator = (profile: any) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }as const
}

export default profilePageReducer;