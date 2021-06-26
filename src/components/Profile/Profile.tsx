import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileResponseType} from "../../redux/profilePageReducer";

type ProfilePropsType = {
    profile: ProfileResponseType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile = (props: ProfilePropsType) => {
    return <div>
        <ProfileInfo profile={props.profile}
                     status={props.status}
                     updateUserStatus={props.updateUserStatus}
                     isOwner={props.isOwner}
                     savePhoto={props.savePhoto}/>
        <MyPostsContainer/>
    </div>
}
export default Profile;
