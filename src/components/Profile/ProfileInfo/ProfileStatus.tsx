import React, {ChangeEvent, useEffect, useState} from 'react';


type StatusPropsType = {
    status: string
    updateUserStatus?: (status: string) => void
}

export const ProfileStatus = (props: StatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const editModeOn = () => {
        setEditMode(true)
        setStatus(props.status)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const updateStatus = () => {
        setEditMode(false)
       props.updateUserStatus && props.updateUserStatus(status)
    }

    return (
        <div> {!editMode
            ? <div>
                Status: <b> <span onDoubleClick={editModeOn}>{props.status ? props.status : '----'}</span> </b>
            </div>

            : <div>
                Status:  <input value={status} onChange={onChange} autoFocus={true} onBlur={updateStatus}/>
            </div>
        }
        </div>

    )
}


export default ProfileStatus