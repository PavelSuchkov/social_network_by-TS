import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, ThunkType} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {RootReduxState} from "../../redux/reduxStore";


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
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
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const Login = (props: any) => {

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