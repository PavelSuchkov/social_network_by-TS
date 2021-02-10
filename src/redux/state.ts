export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type AppStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

export type StoreType = {
    _state: AppStateType
    // updateNewPostText: (newText: string) => void
    // addPost: (postText: string) => void
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => AppStateType
    dispatch: (action: ActionsTypes) => void
}

export type AddPostActionType = {
    type: "ADD-POST",
    newPostText: string
}

export type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newText: string
}

export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType

const store: StoreType = {
    _state: {

        profilePage: {
            posts: [
                {id: 1, message: 'Hi', likesCount: 3},
                {id: 1, message: 'How r u', likesCount: 5},
                {id: 1, message: 'it\'s my first post', likesCount: 13},
                {id: 1, message: 'Любишь пёсиков? =)', likesCount: 33},
                {id: 1, message: 'London is a capital of great Britain', likesCount: 7},
                {id: 1, message: 'Live Belarus!', likesCount: 345}
            ],
            newPostText: ''
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Pasha'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Alexej'},
                {id: 4, name: 'Dima'},
                {id: 5, name: 'Shizofreniya'},
                {id: 6, name: 'freedom_Belarus'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 1, message: 'How r u'},
                {id: 1, message: 'What is ur name'},
                {id: 1, message: 'Любишь пёсиков? =)'},
                {id: 1, message: 'London is a capital of great Britain'},
                {id: 1, message: 'Live Belarus!'}
            ]
        }
    },
    _onChange() {

    },
    subscribe(callback) {
        this._onChange = callback;
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        if (action.type === "ADD-POST") {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._onChange()

        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._onChange()
        }
    }

}

export default store;