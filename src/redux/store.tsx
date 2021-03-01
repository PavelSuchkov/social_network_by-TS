import profilePageReducer, {AddPostActionType, UpdateNewPostTextActionType} from "./profilePageReducer";
import dialogsPageReducer, {sendMessageCreator, updateNewMessageBodyCreator} from "./dialogsPageReducer";
import usersPageReducer, {followActionCreator, setUsersActionCreator, unFollowActionCreator} from "./usersPageReducer";


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
/*export type UserType = {
    id: number,
    followed: boolean,
    fullName: string,
    status: string,
    location: {
        city: string,
        country: string
    }
}*/

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

export type UsersPageType = {
    users: Array<UserType>
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

export type AppStateType = {
    usersPage: UsersPageType
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

export type StoreType = {
    _state: AppStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => AppStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType | updateNewMessageBodyCreator |
    sendMessageCreator | followActionCreator | unFollowActionCreator | setUsersActionCreator

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

        usersPage: {
            /*   users: [{
                   id: 1, followed: false, fullName: 'Pavel', status: 'I\'m studiing now. Do not disturb!!',
                   location: {city: 'M.Horka', country: 'Belarus'}
               }]*/

            users: [{
                name: 'Pavel', id: 1, uniqueUrlName: null, photos: {small: null, large: null},
                followed: false, status: 'I\'m studiing now. Do not disturb!!'
            }]
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
            ],

            newMessageBody: ''
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
        this._state.profilePage = profilePageReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action)
        this._state.usersPage = usersPageReducer(this._state.usersPage, action)
        this._onChange()
    }
}

export default store;