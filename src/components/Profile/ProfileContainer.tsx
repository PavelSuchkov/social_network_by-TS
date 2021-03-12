import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileResponseType, setUserProfileCreator} from "../../redux/profilePageReducer";
import {RootReduxState} from "../../redux/reduxStore";
import {withRouter, RouteComponentProps} from "react-router-dom"

export type ProfileMapStateToPropsType = {
    profile: ProfileResponseType | null
}

type RouteType = {
    userId: string
}

export type ProfileMapDispatchToPropsType = {
    setUserProfileCreator: (profile: ProfileResponseType) =>  void
}

export type ProfileOwnProps = {
    profile: ProfileResponseType | null
    setUserProfileCreator: (profile: ProfileResponseType) =>  void
}


class ProfileContainer extends React.Component<ProfileOwnProps & RouteComponentProps<RouteType>>{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '2';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {

                this.props.setUserProfileCreator(response.data);
            });
    }

    render(){                                                //???
        return <div>
         <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }
}

const mapStateToProps = (state: RootReduxState): ProfileMapStateToPropsType => ({
    profile: state.profilePage.profile
});

let withUrlDataContainerComponent  = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfileCreator})(withUrlDataContainerComponent);
