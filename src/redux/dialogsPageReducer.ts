import state, {ActionsTypes, DialogPageType} from "./state"

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

const dialogsPageReducer = (state: DialogPageType, action: ActionsTypes) => {


    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({
                id: (state.messages.length),
                message: body
            })
            return state

        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return state

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