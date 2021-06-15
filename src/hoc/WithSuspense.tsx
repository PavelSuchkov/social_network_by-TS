import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {RootReduxState} from "../redux/reduxStore";


export function withSuspense<T>(Component: ComponentType<T>) {

    return (props: any) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </React.Suspense>
    };
}
