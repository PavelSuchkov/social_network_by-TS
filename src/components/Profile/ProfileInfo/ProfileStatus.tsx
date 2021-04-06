import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Preloader} from "../../common/Preloader/Preloader";


type StatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatus = (props: StatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    const toggleEditMode = () => {
        setEditMode(true)
        setStatus(props.status)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const updateStatus = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    return (
        <div>{!editMode
            ? <div>
                <span onDoubleClick={toggleEditMode}>{props.status ? props.status : '----'}</span>
            </div>

            : <div>
                <input value={status} onChange={onChange} autoFocus={true} onBlur={updateStatus}/>
            </div>
        }
        </div>

    )
}


export default ProfileStatus