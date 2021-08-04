import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootReduxState} from "../../../redux/reduxStore";


type StatusPropsType = {
    status: string
    updateUserStatus?: (status: string) => void
}

export const ProfileStatus = (props: StatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);
    const errorText = useSelector<RootReduxState, string | null>( state => state.profilePage.error)

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
            {errorText? <span style={{'color': 'red'}}>{errorText}</span> : null}
        </div>

    )
}


export default ProfileStatus