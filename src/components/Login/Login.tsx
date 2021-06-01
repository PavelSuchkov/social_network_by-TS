import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {RootReduxState} from "../../redux/reduxStore";
import styles from '../common/FormsControls/FormsControls.module.css'


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {

    return <form onSubmit={handleSubmit}>
        <div>
            {/*{createField('Email', 'email', [required], Input)}*/}
            <Field placeholder={'Email'} name={'email'} validate={[required]} component={Input}/>
        </div>
        <div>
            <Field placeholder={'Password'} name={'password'} type={'password'} validate={[required]} component={Input}/>
        </div>
        <div>
            <Field component={Input} name={'rememberMe'} type={'checkbox'}/> Remember me
        </div>
        { error && <div className={styles.formSummaryError}>
            {error}
        </div> }
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

type LoginProps = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
}
const Login = (props: LoginProps) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: RootReduxState) => ({
    isAuth: state.authorization.isAuth
})

export default connect(mapStateToProps, {login}) (Login)