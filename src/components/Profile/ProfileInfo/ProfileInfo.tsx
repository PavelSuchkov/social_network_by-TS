import React, {ChangeEvent, useState} from 'react';
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileResponseType} from "../../../redux/profilePageReducer";
import ProfileStatus from "./ProfileStatus";
import avatar from "./../../../assets/images/avatar/avatar.png"
import {ProfileDataForm} from "./profileDataForm";

type profileInfoPropsType = {

    profile: ProfileResponseType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = (props: profileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const toggleEditMode = () => {
        editMode ? setEditMode(false) : setEditMode(true)
    }

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].type !== 'image/jpeg' && 'image/png' && 'image/jpg') {
                alert('The picture must be a file of type: jpeg, jpg, png')
            } else {
                const file = e.target.files[0];
                props.savePhoto(file)
            }
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div>
                    {props.profile.photos?.large ?
                        <img src={props.profile.photos.large || avatar} className={classes.mainPhoto}/> : avatar}
                </div>
                <div>
                    {props.isOwner && <input type={'file'} onChange={(e) => {
                        e.currentTarget.value.length !== 0 && onMainPhotoSelected(e)
                    }}/>}
                </div>
                {editMode ? <ProfileDataForm profile={props.profile} isOwner={props.isOwner}
                                             onMainPhotoSelected={onMainPhotoSelected}
                                             editMode={editMode} toggleEditMode={toggleEditMode}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                   onMainPhotoSelected={onMainPhotoSelected}
                                   editMode={editMode} toggleEditMode={toggleEditMode}/>}

                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}
export type ProfileDataType = {
    profile: ProfileResponseType
    isOwner: boolean
    editMode: boolean
    toggleEditMode: () => void
    onMainPhotoSelected: any
}
const ProfileData = (props: ProfileDataType) => {
    return <div>
        <div>
            <div>
                Full name: {props.profile.fullName}
            </div>
            <div>
                Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {props.profile.lookingForAJob &&
            <div>
                Looking for a description: {props.profile.lookingForAJobDescription}
            </div>}
            <div>
                About me: {props.profile.aboutMe}
            </div>
            <div>
                Contacts: {props.profile.contacts && Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key}
                                contactValue={props.profile.contacts[key as keyof ContactType]}/>
            })}
            </div>
            {props.isOwner && <button onClick={props.toggleEditMode}>Edit</button>}

        </div>
    </div>
}

export type ContactsType = {
    contactTitle: string,
    contactValue: any
    onChange?: (e: string | ChangeEvent<any>) => void
}

export type ContactType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export const Contact = (contacts: ContactsType) => {
    return <div className={classes.contact}><b>{contacts.contactTitle}</b>: <a
        href={contacts.contactValue}>{contacts.contactValue}</a></div>
}
export default ProfileInfo;