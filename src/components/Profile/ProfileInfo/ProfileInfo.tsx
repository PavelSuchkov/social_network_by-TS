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
    if(!props.profile){
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if( e.target.files) {
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
            {/*<div>*/}
            {/*    <img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg" alt=""/>*/}
            {/*</div>*/}
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || avatar} className={classes.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={(e) =>
                {e.currentTarget.value.length !== 0 && onMainPhotoSelected(e)}}/>}
                AVA + description
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;