import React from "react";
import {ContactsType, ProfileDataType} from "./ProfileInfo";
import {useFormik} from "formik";
import classes from "./ProfileInfo.module.css";

export const ProfileDataForm = (props: ProfileDataType) => {

    const formik = useFormik({

        initialValues: {
            fullName: props.profile.fullName,
            aboutMe: props.profile.aboutMe,
            facebook: props.profile.contacts.facebook,
            website: props.profile.contacts.website,
            vk: props.profile.contacts.vk,
            twitter: props.profile.contacts.twitter,
            instagram: props.profile.contacts.instagram,
            youtube: props.profile.contacts.youtube,
            github: props.profile.contacts.github,
            mainLink: props.profile.contacts.mainLink,
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
        },

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
        <button type="submit">Confirm edits</button>
        <button onClick={props.toggleEditMode}>Save</button>
    </form>
}

export const ContactForm = (contacts: ContactsType) => {
    return <div className={classes.contact}><b>{contacts.contactTitle}</b>: <input type="text"
                                                                                   name={contacts.contactTitle}
                                                                                   placeholder={contacts.contactTitle}
                                                                                   onChange={contacts.onChange}/></div>
}

type ContactType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

