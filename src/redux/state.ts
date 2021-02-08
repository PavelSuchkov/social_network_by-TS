


export let renderEntireTree = () => {
    console.log()
}

export type MessageType = {
    id: number
    message: string
}

export type DialogType ={
    id: number
    name: string
}

export type PostType ={
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

let state = {

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
}

export const  updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    renderEntireTree()
}

export const addPost = () => {
    const newPost: PostType = {
        id: new Date().getTime(),
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    renderEntireTree()
}

export const subscribe = (observer: () => void) => {
    renderEntireTree = observer;
}

export default state;