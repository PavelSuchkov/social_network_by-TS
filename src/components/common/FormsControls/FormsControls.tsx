import React from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const Textarea: React.FC<FormControlPropsType & WrappedFieldProps> =
    ({input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error

    return (
        <div className={styles.formControl }>
            <div>
                <textarea  className={hasError && styles.formInputError}
                    {...input} {...props}/>
            </div>
            {hasError && <span className={styles.error}>{error}</span> }
        </div>
    )
}

export const Input: React.FC<FormControlPropsType & WrappedFieldProps> =
    ({input, meta: {touched, error}, ...props}) => {

        const hasError = touched && error

        return (
            <div className={styles.formControl}>
                <div>
                    <input  className={hasError && styles.formInputError}
                        {...input} {...props}/>
                </div>
                {hasError && <span className={styles.error}>{error}</span> }
            </div>
        )
    }

    export const createField = (placeholder: string, name: string, validators: Array<Function> | undefined, component: any) => {
        return <Field placeholder={placeholder}
                      name={name}
                      validate={[validators]}
                      component={component}/>
    }