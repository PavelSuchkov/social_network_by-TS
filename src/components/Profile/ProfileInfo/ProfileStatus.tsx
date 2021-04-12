import React, {ChangeEvent, useState} from 'react';


type StatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatus = (props: StatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    const editModeOn = () => {
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
                <span onDoubleClick={editModeOn}>{props.status ? props.status : '----'}</span>
            </div>

            : <div>
                <input value={status} onChange={onChange} autoFocus={true} onBlur={updateStatus}/>
            </div>
        }
        </div>

    )
}


export default ProfileStatus