import {combineReducers, createStore, applyMiddleware} from "redux";
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import usersPageReducer from "./usersPageReducer"
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";


const reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    authorization: authReducer,
    form: formReducer
})

export type RootReduxState = ReturnType<typeof reducers>


const store = createStore(reducers, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store

export default store;