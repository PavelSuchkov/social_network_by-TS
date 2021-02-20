import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, AppStateType, ProfilePageType} from "../../redux/store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

// type propsType = {
//     store: AppStateType
//     dispatch: (action: ActionsTypes) => void
// }

const Profile = (/*props: propsType*/) => {
    return <div>
        <ProfileInfo/>
        <MyPostsContainer />
    </div>
}
export default Profile;
{/*posts={store.profilePage.posts}
                          newPostText={props.store.profilePage.newPostText}
                          dispatch={props.dispatch}*/}