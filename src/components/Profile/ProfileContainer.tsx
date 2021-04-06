import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUserProfile, getUserStatus, ProfileResponseType, updateUserStatus} from "../../redux/profilePageReducer";
import {RootReduxState} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

type ProfileMapStateToPropsType = {
    profile: ProfileResponseType | null
    status: string
}

type RouteType = {
    userId: string
}

type ProfileOwnProps = {

}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
}

type PropsType = MapDispatchPropsType & ProfileMapStateToPropsType & ProfileOwnProps & RouteComponentProps<RouteType>


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 13489;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    render() {
        return <div>
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status} />
        </div>
    }
}

const mapStateToProps = (state: RootReduxState): ProfileMapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status

});

export default compose<React.ComponentType>(
    connect<ProfileMapStateToPropsType, MapDispatchPropsType, ProfileOwnProps, RootReduxState>
    (mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect)(ProfileContainer)



