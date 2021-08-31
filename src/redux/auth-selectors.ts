import {RootReduxState} from "./reduxStore";


export const selectIsAuth = (state: RootReduxState) => {
    return state.authorization.isAuth
}
export const selectCurrentUserLogin = (state: RootReduxState) => {
    return state.authorization.login
}