import state, {ActionsTypes, DialogPageType} from "./store"

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

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
    ],
        newMessageBody: ''
}

const dialogsPageReducer = (state: DialogPageType = initialState, action: ActionsTypes) => {


    switch (action.type) {
        case SEND_MESSAGE:{
            let body = state.newMessageBody;
            let stateCopy = {...state};
            stateCopy.newMessageBody = '';
            stateCopy.messages.push({
                id: (stateCopy.messages.length),
                message: body
            })
            return stateCopy;
        }

        case UPDATE_NEW_MESSAGE_BODY:{
            let stateCopy = {...state};
            stateCopy.newMessageBody = action.newMessageBody;
            return stateCopy;
        }
        default:
            return state
    }
}


export type updateNewMessageBodyCreator = ReturnType<typeof updateNewMessageBodyCreator>

export type sendMessageCreator = ReturnType<typeof sendMessageCreator>


export const updateNewMessageBodyCreator = (body: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        newMessageBody: body
    } as const
}

export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE
    }as const
}
export default dialogsPageReducer;