import {Dispatch} from "redux";
import { ThunkAction } from "redux-thunk";
import {authAPI} from "../api/api";
import { RootReduxState } from "./reduxStore";

const SET_USER_DATA = 'SET-USER-DATA';


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
 }as const
}

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login } = response.data.data
                dispatch(setAuthUserData({id, email, login, isAuth: true}))
            }
        });
}

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionsType>

export const login = (email: string, password: string, rememberMe: boolean ):ThunkType => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
        });
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData({id: null, email: null, login: null, isAuth: false}))
            }
        });
}

