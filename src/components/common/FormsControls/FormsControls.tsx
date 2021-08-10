import React from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";


type FormControlParamsType = {
    meta: {
        touched: boolean,
        error: string
    },
    children: React.ReactNode
}

type FormControlType = (params: FormControlParamsType) => React.ReactNode;

const FormControl: React.FC<FormControlParamsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}


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

    export const createField = (placeholder: string | undefined,
                                name: string,
                                validators: Array<Function> | undefined,
                                component: React.FC<WrappedFieldProps>,
                                props = {},
                                text: string) => {
        return <div>
        <Field placeholder={placeholder}
                      name={name}
                      validate={validators}
                      component={component}
                      {...props}/>
                        {text}
        </div>
    }