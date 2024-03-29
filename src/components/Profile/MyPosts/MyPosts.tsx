import React, {FormEvent, useState} from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/profilePageReducer";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type PropsType = {
    posts: PostType[]
    addPost: (value: string) => void
}

type FormDataType = {
    newPostText: string
}

const maxLength30 = maxLengthCreator(30)

const MyPosts = React.memo((props: PropsType) => {

    const postsElements = [...props.posts].map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    const addPost = (value: FormDataType) => {
        props.addPost(value.newPostText)
    }

    return <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <AddPostReduxForm onSubmit={addPost}/>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
});

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    const onSubmit = (e: FormEvent ) => {
        props.handleSubmit(e);

    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <Field component={Textarea} name="newPostText" placeholder="Enter ur message"
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <button type='submit'>Post</button>
            </div>
        </form>
    )
}


const AddPostReduxForm = reduxForm<FormDataType>({
    form: "profileAddPostForm"
})(AddPostForm)

export default MyPosts;