import {getAuthUserData} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {RootReduxState} from "./reduxStore";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}
export type InitialAppStateType = typeof initialState;



export const appReducer = (state: InitialAppStateType = initialState, action: ActionType): InitialAppStateType => {

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

type ActionType = ReturnType<typeof initializedSuccess>

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const;

export type ThunkType = ThunkAction<void, RootReduxState, unknown, ActionType>

export const initializeApp = (): ThunkType =>
   async (dispatch) => {
       let response = await dispatch(getAuthUserData());
                            dispatch(initializedSuccess())

}





