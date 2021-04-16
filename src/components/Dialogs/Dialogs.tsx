import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Mesage";
import {DialogPageType} from "../../redux/dialogsPageReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type PropsType = {
    dialogsPage: DialogPageType
    updateNewMessageBody: (text: string) => void
    sendMessage: (value: string) => void
}

type FormDataType = {
    newMessageBody: string
}

const Dialogs = (props: PropsType) => {
    const dialogsElement = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    const addNewMessage = (value: FormDataType) => {
        props.sendMessage(value.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.contentWrapper}>
                <div className={classes.dialogsItems}>
                    {dialogsElement}
                </div>
                <div className={classes.messages}>
                    <div>{messagesElements}</div>
                    <AddMessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

const maxLength40 = maxLengthCreator(40)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
                   validate={[required, maxLength40]}
                   name="newMessageBody" placeholder="Enter ur message"/>
        </div>
        <div>
            <button type='submit'>Send message</button>
        </div>
    </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType>({
    form: "dialogAddMessageForm"
})(AddMessageForm)


export default Dialogs;