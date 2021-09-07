import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./reduxStore";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

export type StatusType = 'pending' | 'ready' | 'error';

const initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as StatusType
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
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
               status: action.payload.status
            }
        default:
            return state
    }

}

type ActionsType = ReturnType<typeof actions.messagesReceived> | ReturnType<typeof actions.statusChanged>

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEiVED', payload: {messages}
    } as const),

    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType =>
    async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
    }

export const stopMessagesListening = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribe('messages-received' ,newMessageHandlerCreator(dispatch));
        chatAPI.unsubscribe('status-changed' ,statusChangedHandlerCreator(dispatch));
        chatAPI.stop();
    }

export const senMessage = (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message)
    }

