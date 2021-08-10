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
    captchaUrl?: string | null| undefined
    captcha?: string
}

type LoginOwnProps = {
    captchaUrl?: string | null| undefined
}

const LoginForm: React.FC<InjectedFormProps<FormDataType & LoginOwnProps> & LoginOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    debugger
    return <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder={'Email'} name={'email'} validate={[required]} component={Input}/>
        </div>
        <div>
            <Field placeholder={'Password'} name={'password'} type={'password'} validate={[required]} component={Input}/>
        </div>
        <div>
            <Field component={Input} name={'rememberMe'} type={'checkbox'}/> Remember me
        </div>
        <div>
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && <Field placeholder={'Captcha'} name={'captcha'} component={Input}/>}
        </div>
        { error && <div className={styles.formSummaryError}>
            {error}
        </div> }
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type LoginProps = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean, captcha?: string) => void
    captchaUrl?: string | null | undefined
}
const Login = (props: LoginProps) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>

        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
        {/*<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />*/}
    </div>
}

const mapStateToProps = (state: RootReduxState) => ({
    isAuth: state.authorization.isAuth,
    captchaUrl: state.authorization.captchaUrl
})

export default connect(mapStateToProps, {login}) (Login)