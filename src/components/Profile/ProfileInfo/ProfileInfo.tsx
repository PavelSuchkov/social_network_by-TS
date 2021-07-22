import React, {ChangeEvent} from 'react';
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileResponseType} from "../../../redux/profilePageReducer";
import ProfileStatus from "./ProfileStatus";
import avatar from "./../../../assets/images/avatar/avatar.png"

type profileInfoPropsType = {

    profile: ProfileResponseType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = (props: profileInfoPropsType) => {
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
                <ProfileData profile={props.profile} isOwner={props.isOwner} onMainPhotoSelected={onMainPhotoSelected} />
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}  />
            </div>
        </div>
    )
}
type ProfileDataType = {
    profile: ProfileResponseType
    isOwner: boolean
    onMainPhotoSelected: any
}
const ProfileData = (props: ProfileDataType) => {
  return  <div>
        <img src={props.profile.photos.large || avatar} className={classes.mainPhoto}/>
        {props.isOwner && <input type={'file'} onChange={(e) => {
            e.currentTarget.value.length !== 0 && props.onMainPhotoSelected(e)
        }}/>}
        <div>
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
        </div>
    </div>
}

type ContactsType = {
    contactTitle: string,
    contactValue: string
}

const Contact = (contacts: ContactsType) => {
    return <div className={classes.contact}><b>{contacts.contactTitle}</b>: {contacts.contactValue}</div>
}

export default ProfileInfo;