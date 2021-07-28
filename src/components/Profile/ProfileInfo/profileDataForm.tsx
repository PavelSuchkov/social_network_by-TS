import React from "react";
import {ProfileDataType, Contact, ContactsType} from "./ProfileInfo";
import {Form, useFormik} from "formik";
import classes from "./ProfileInfo.module.css";

export const ProfileDataForm = (props: ProfileDataType) => {

    const formik = useFormik({

        initialValues: {
            aboutMe: props.profile.aboutMe,
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
        },

    });
    return <form onSubmit={formik.handleSubmit}>
        <div>
            Full name: {props.profile.fullName}
        </div>
        <div>
            Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            Looking for a job: {props.profile.lookingForAJobDescription}
        </div>}
        <div>
            About me: <input type="text" name={'aboutMe'} onChange={formik.handleChange} value={props.profile.aboutMe}/>
        </div>
        <div>
            Contacts:
            <p>
                <input type="text" name={'facebook'} placeholder={'facebook'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'website'} placeholder={'website'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'vk'} placeholder={'vk'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'twitter'} placeholder={'twitter'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'instagram'} placeholder={'instagram'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'youtube'} placeholder={'youtube'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'github'} placeholder={'github'} onChange={formik.handleChange}/>
            </p>
            <p>
                <input type="text" name={'mainLink'} placeholder={'mainLink'} onChange={formik.handleChange}/>
            </p>
        </div>
        <button type="submit" >Confirm edits</button>
        <button onClick={props.toggleEditMode}>Save</button>
    </form>
}
