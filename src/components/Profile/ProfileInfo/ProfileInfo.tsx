import React from 'react';
import classes from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg" alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                AVA + description
            </div>
        </div>
    )
}

export default ProfileInfo;