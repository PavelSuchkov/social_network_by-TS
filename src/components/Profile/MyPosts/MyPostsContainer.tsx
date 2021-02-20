import React, {ChangeEvent} from 'react';
import {ActionsTypes, PostType} from "../../../redux/store";
import {addPostCreator, updateNewPostCreator,} from "../../../redux/profilePageReducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import store from "../../../redux/reduxStore";


/*type PropsType = {
    posts: PostType[]
    dispatch: (action: ActionsTypes) => void
    newPostText: string

}*/

/*const MyPostsContainer = (/!*props: PropsType*!/) => {


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
}*/

let mapStateProps = (state = store.getState()) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchProps = (dispatch = store.dispatch) => {
    return{
        addPost: () => {dispatch(addPostCreator(store.getState().profilePage.newPostText))},
        updateNewPostText: (text: string) => {dispatch(updateNewPostCreator(text))}
    }
}


const MyPostsContainer = connect(mapStateProps, mapDispatchProps) (MyPosts);

export default MyPostsContainer;

