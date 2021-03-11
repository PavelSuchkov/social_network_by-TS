import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    profile: any
}

const Profile = (props: ProfilePropsType) => {
    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer />
    </div>
}
export default Profile;
