import React from "react";
import {connect, useDispatch} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {RootReduxState} from "../../redux/reduxStore";
import {useFormik} from "formik";

type ForLoginPropsType = {
    captchaUrl: string | undefined | null
}

const LoginForm = (props: ForLoginPropsType) => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkbox: true,
            captcha: ''
        },

        onSubmit: values => {
        dispatch(login(values.email, values.password, values.checkbox, values.captcha));
        formik.resetForm();
    }

})

    return <form onSubmit={formik.handleSubmit}>

        <div>
            <input type={'text'} placeholder={'Email'} name={'email'} onChange={formik.handleChange}/>
        </div>
        <div>
            <input placeholder={'Password'} name={'password'} type={'password'} onChange={formik.handleChange}/>
        </div>
        <div>
            <input name={'rememberMe'} type={'checkbox'} onChange={formik.handleChange}/> Remember me
        </div>
        <div>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && <input type={'text'} placeholder={'Symbols from image'} name={'captcha'}/>}
        </div>
        <button type="submit">Yes</button>

    </form>
}


type LoginProps = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean, captcha?: string) => void
    captchaUrl?: string | null | undefined
}
const Login = (props: LoginProps) => {


    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm captchaUrl={props.captchaUrl}/>

    </div>
}

const mapStateToProps = (state: RootReduxState) => ({
    isAuth: state.authorization.isAuth,
    captchaUrl: state.authorization.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)