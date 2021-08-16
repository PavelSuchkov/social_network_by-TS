import {Field, Form, Formik, FormikValues} from "formik";
import React from "react";
import {FilterType} from "../../redux/usersPageReducer";

const usersSearchFormValidate = (values: FormikValues) => {
    const errors = {};
    return errors
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type SearchFormType = {
    term: string
    friend: "true" | "false" | "null"
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: SearchFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"    // friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name='friend' as={'select'}>
                        <option value={"null"}>All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})