import React from 'react';
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileResponseType} from "../../../redux/store";

type profileInfoPropsType = {
    profile: any
}

const ProfileInfo = (props: profileInfoPropsType) => {
    if(!props.profile){
        return <Preloader/>
    }


    return (
        <div>
            <div>
                <img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg" alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                AVA + description
            </div>
        </div>
    )
}

export default ProfileInfo;