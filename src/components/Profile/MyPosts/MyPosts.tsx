import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";

type PropsType = {
    posts: PostType[]
    addPost: (newText: string) => void
    updateNewPostText: (newText: string) => void
    newPostText: string
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    const addPost = () => {
        props.addPost(props.newPostText);
    }


    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        props.updateNewPostText(e.currentTarget.value)
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

export default MyPosts;