import React from "react";
import {ContactsType, ContactType, ProfileDataType} from "./ProfileInfo";
import {useFormik, Form, useFormikContext} from "formik";
import classes from "./ProfileInfo.module.css";
import {useDispatch, useSelector} from "react-redux";
import {saveProfile} from "../../../redux/profilePageReducer";
import {RootReduxState} from "../../../redux/reduxStore";


export const ProfileDataForm = (props: ProfileDataType) => {

    const dispatch = useDispatch();
    const userId = useSelector<RootReduxState, number>((state) => state.profilePage.profile.userId)

    const formik = useFormik({
        initialValues: {
            userId: userId,
            fullName: props.profile.fullName,
            aboutMe: props.profile.aboutMe,
            lookingForAJob: true,
            lookingForAJobDescription: 'yes this is description',
            contacts: {
                facebook: props.profile.contacts.facebook,
                website: props.profile.contacts.website,
                vk: props.profile.contacts.vk,
                twitter: props.profile.contacts.twitter,
                instagram: props.profile.contacts.instagram,
                youtube: props.profile.contacts.youtube,
                github: props.profile.contacts.github,
                mainLink: props.profile.contacts.mainLink,
            }
        },
        onSubmit: values => {
            dispatch(saveProfile(values))
            console.log(JSON.stringify(values, null, 2));
            formik.resetForm();
            props.toggleEditMode()
        }

    });
    return <form onSubmit={formik.handleSubmit}>
        <div>
            Full name: {props.profile.fullName} <input type="text" name={'fullName'}
                                                       placeholder={props.profile.fullName}
                                                       onChange={formik.handleChange}
        />
        </div>
        <div>
            Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            Looking for a job: {props.profile.lookingForAJobDescription}
        </div>}
        <div>
            About me: <input type="text" name={'aboutMe'} onChange={formik.handleChange}
                             placeholder={props.profile.aboutMe}/>
        </div>
        <div>
            Contacts: {props.profile.contacts && Object.keys(props.profile.contacts).map(key => {
            return <ContactForm key={key} contactTitle={key}
                                contactValue={props.profile.contacts[key as keyof ContactType]}
                                onChange={formik.handleChange}/>
        })}

        </div>

        {props.isOwner && <div>
            <button type="submit">Confirm edits</button>
        </div>}
    </form>
}

export const ContactForm = (contacts: ContactsType) => {
    return <div className={classes.contact}><b>{contacts.contactTitle}</b>: <input type="text"
                                                                                   name={"contacts." + contacts.contactTitle}
                                                                                   placeholder={contacts.contactValue}
                                                                                   // value={contacts.contactValue}
                                                                                   onChange={contacts.onChange}/></div>
}



