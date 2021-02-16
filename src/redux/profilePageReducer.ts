import state, {ActionsTypes, PostType, ProfilePageType} from "./state";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"


const profilePageReducer = (state: ProfilePageType, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost);
            state.newPostText = '';
            return state

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state

        default:
            return state
    }
}

export type AddPostActionType = ReturnType<typeof addPostCreator>

export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostCreator>

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

export default profilePageReducer;