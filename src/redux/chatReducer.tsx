import {ThunkAction} from "redux-thunk";
import {ResultCodesEnum} from "../api/api";
import {RootReduxState} from "./reduxStore";
import {stopSubmit} from "redux-form"
import {authAPI, securityAPI} from "../api/auth-API";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {setAuthUserData} from "./authReducer";
import {Dispatch} from "redux";


const initialState = {
    messages: [] as Array<ChatMessageType>
}
//
type InitialStateType = typeof initialState


export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'chat/MESSAGES_RECEiVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }

}

type ActionsType = ReturnType<typeof actions.messagesReceived>

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEiVED', payload: {messages}
    } as const)
}


export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType =>
    async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }

export const stopMessagesListening = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
        chatAPI.stop();
    }

export const senMessage = (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message)
    }

