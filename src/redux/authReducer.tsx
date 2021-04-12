import {Dispatch} from "redux";
import {authAPI} from "../api/api";

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
                ...action.userData
            }
        }
        default:
            return state
        }

}

type ActionsType = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (userData: initialStateSetUserType) => {
 return {
     type: SET_USER_DATA,
     userData
 }as const
}

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login } = response.data.data
                dispatch(setAuthUserData({id, email, login, isAuth:true}))  //???
            }
        });
}
