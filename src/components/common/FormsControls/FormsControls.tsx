import React from 'react';
import styles from './FormsControls.module.css'
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const Textarea: React.FC<FormControlPropsType & WrappedFieldProps> =
    ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={styles.formControl }>
            <div>
                <textarea  className={hasError && styles.formInputError}
                    {...input} {...props}/>
            </div>
            {hasError && <span className={styles.error}>{meta.error}</span> }
        </div>
    )
}

export const Input: React.FC<FormControlPropsType & WrappedFieldProps> =
    ({input, meta, ...props}) => {

        const hasError = meta.touched && meta.error

        return (
            <div className={styles.formControl}>
                <div>
                    <input  className={hasError && styles.formInputError}
                        {...input} {...props}/>
                </div>
                {hasError && <span className={styles.error}>{meta.error}</span> }
            </div>
        )
    }