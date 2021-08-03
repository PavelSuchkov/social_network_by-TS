import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./reduxStore";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}
type ActionType = ReturnType<typeof initializedSuccess>

export const appReducer = (state = initialState, action: ActionType) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const;

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionType>

export const initializeApp = (): ThunkType =>
   async (dispatch) => {
       let response = await dispatch(getAuthUserData());
                            dispatch(initializedSuccess())

}





