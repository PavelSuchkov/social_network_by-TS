// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

export type MessageType = {
    id: number
    message: string
}

export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type DialogType = {
    id: number
    name: string
}

let initialState =  {
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

const dialogsPageReducer = (state: DialogPageType = initialState, action: ActionsType) => {

    switch (action.type) {

        case SEND_MESSAGE:{
            let body = action.newMessageBody;
            return  {
                ...state,
                messages: [...state.messages, {id: (state.messages.length), message: body}]
            };
        }
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof sendMessage>

export const sendMessage = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }as const
}
export default dialogsPageReducer;