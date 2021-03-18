import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileResponseType} from "../../redux/profilePageReducer";

type ProfilePropsType = {
    profile: ProfileResponseType | null
}

const Profile = (props: ProfilePropsType) => {
    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer />
    </div>
}
export default Profile;
