import {ThunkAction} from "redux-thunk";
import {authAPI, ResultCodesEnum, securityAPI} from "../api/api";
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


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(setAuthUserData({id, email, login, isAuth: true}))
    }

}

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string ): ThunkType =>
    async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = loginData.messages.length > 0
            ? loginData.messages[0]
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

