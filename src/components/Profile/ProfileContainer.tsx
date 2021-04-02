import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileResponseType} from "../../redux/profilePageReducer";
import {RootReduxState} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

export type ProfileMapStateToPropsType = {
    profile: ProfileResponseType | null
}

type RouteType = {
    userId: string
}

export type ProfileOwnProps = {
    profile: ProfileResponseType | null
    getUserProfile: (userId: number) => void
    isAuth: boolean
}

class ProfileContainer extends React.Component<ProfileOwnProps & RouteComponentProps<RouteType>> {

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 9;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        return <div>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }
}

const mapStateToProps = (state: RootReduxState): ProfileMapStateToPropsType => ({
    profile: state.profilePage.profile,

});

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default withAuthRedirect(connect(mapStateToProps, {getUserProfile})(withUrlDataContainerComponent));
