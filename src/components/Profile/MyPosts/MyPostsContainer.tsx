import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionsTypes, PostType} from "../../../redux/store";
import { addPostCreator, updateNewPostCreator,} from "../../../redux/profilePageReducer"

type PropsType = {
    posts: PostType[]
    dispatch: (action: ActionsTypes) => void
    newPostText: string
}

const MyPostsContainer = (props: PropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    const addPost = () => {
        props.dispatch(addPostCreator(props.newPostText));
    }

    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        props.dispatch(updateNewPostCreator(e.currentTarget.value))
    }


    return <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea onChange={onPostChange}  value={props.newPostText}/>
        </div>
        <div>
            <button onClick={addPost} className={classes.postButton}>Add post</button>
        </div>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPostsContainer;