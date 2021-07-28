import React from "react";
import {ProfileDataType, Contact} from "./ProfileInfo";
import {Form} from "formik";

export const ProfileDataForm = (props: ProfileDataType) => {
    return <Form>
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
            About me: {props.profile.aboutMe}
        </div>
        <div>
            Contacts: {props.profile.contacts && Object.keys(props.profile.contacts).map(key => {
            // @ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
        </div>
        <button onClick={props.toggleEditMode}>Save</button>
    </Form>
}