import React, {ChangeEvent} from 'react';
import {ActionsTypes, PostType} from "../../../redux/store";
import {addPostCreator, updateNewPostCreator,} from "../../../redux/profilePageReducer"
import MyPosts from "./MyPosts";

type PropsType = {
    posts: PostType[]
    dispatch: (action: ActionsTypes) => void
    newPostText: string

}

const MyPostsContainer = (props: PropsType) => {


    const addPost = () => {
        props.dispatch(addPostCreator(props.newPostText));
    }

    const onPostChange = (text: string) => {
        props.dispatch(updateNewPostCreator(text))
    }


    return (<MyPosts posts={props.posts}
                 addPost={addPost}
                 updateNewPostText={onPostChange}
                 newPostText={props.newPostText}/>)
}

export default MyPostsContainer;