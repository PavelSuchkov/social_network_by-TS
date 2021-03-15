import {combineReducers, createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import usersPageReducer from "./usersPageReducer"
import {authReducer} from "./authReducer";


let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    authorization: authReducer
})

export type RootReduxState = ReturnType<typeof reducers>


let store = createStore(reducers)


// @ts-ignore
window.store = store

export default store;