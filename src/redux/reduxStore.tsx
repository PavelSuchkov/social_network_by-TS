
import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import usersPageReducer from "./usersPageReducer"
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk";
import reducer, { reducer as formReducer } from "redux-form";
import {appReducer} from "./appReducer";
import {chatReducer} from "./chatReducer";


const reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    authorization: authReducer,
    initialization: appReducer,
    chat: chatReducer,
    form: formReducer
})

export type RootReduxState = ReturnType<typeof reducers>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));

// const store = createStore(reducers, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store

export default store;