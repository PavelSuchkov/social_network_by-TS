import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {authAPI, securityAPI} from "../api/api";
import {RootReduxState} from "./reduxStore";
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS';


const initialState: initialStateSetUserType = {
    id: 0,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export type initialStateSetUserType = {
    id: number
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl?: string | null
}

export const authReducer = (state: initialStateSetUserType = initialState, action: ActionsType) => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payLoad
            }

        default:
            return state
    }

}

type ActionsType =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof getCaptchaUrlSuccess>

export const setAuthUserData = (payLoad: initialStateSetUserType) => {
    return {
        type: SET_USER_DATA,
        payLoad
    } as const
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payLoad: {captchaUrl}
    } as const
}


export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData({id, email, login, isAuth: true}))
    }

}

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string )
    : ThunkType => async (dispatch) => {
  //  debugger
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'Some error'
        dispatch(stopSubmit("login", {_error: message}) as ActionsType);
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData({id: 0, email: null, login: null, isAuth: false}))
    }
}

