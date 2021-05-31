import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../api/api";
import {RootReduxState} from "./reduxStore";
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'auth/SET-USER-DATA';



const initialState: initialStateSetUserType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type initialStateSetUserType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export const authReducer = (state: initialStateSetUserType = initialState, action: ActionsType) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payLoad
            }
        }
        default:
            return state
    }

}

type ActionsType = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (payLoad: initialStateSetUserType) => {
    return {
        type: SET_USER_DATA,
        payLoad
    } as const
}



export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response =  await authAPI.me()
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData({id, email, login, isAuth: true}))
            }

}

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

export const login = (email: string, password: string, rememberMe: boolean)
    : ThunkType => async (dispatch) => {

   let response = await authAPI.login(email, password, rememberMe)

            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                let message = response.data.messages.length > 0
                    ? response.data.messages[0]
                    :  'Some error'
                dispatch(stopSubmit("login", {_error: message}) as ActionsType);
            }
}

export const logout = (): ThunkType => async (dispatch) => {
   let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData({id: null, email: null, login: null, isAuth: false}))
            }
}

