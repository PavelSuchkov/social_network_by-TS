import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {RootReduxState} from "../redux/reduxStore";

type MSTPType = {
    isAuth: boolean
}

const MSTP = (state: RootReduxState): MSTPType => {
    return {
        isAuth: state.authorization.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    function RedirectComponent(props: MSTPType) {
        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to={'/Login'}/>

        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(MSTP)(RedirectComponent)
    return ConnectedRedirectComponent
}
