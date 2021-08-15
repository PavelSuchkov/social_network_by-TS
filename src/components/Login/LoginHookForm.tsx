import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {RootReduxState} from "../../redux/reduxStore";
import {useFormik} from "formik";

type ForLoginPropsType = {
    captchaUrl: string | undefined | null
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const LoginForm = (props: ForLoginPropsType) => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true,
            captcha: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'password Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be more then 2 chars';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
            formik.resetForm();
        }

    })
    return <form onSubmit={formik.handleSubmit} name={'login'}>
        <div>
            <input type={'text'} placeholder={'Email'} name={'email'}
                   onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {
                formik.touched.email && formik.errors.email
                    ? <div style={{'color': 'red'}}>{formik.errors.email}</div> : null
            }
        </div>
        <div>
            <input placeholder={'Password'} name={'password'} type={'password'}
                   onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {
                formik.touched.password && formik.errors.password
                    ? <div style={{'color': 'red'}}>{formik.errors.password}</div> : null
            }
        </div>
        <div>
            <input name={'rememberMe'} type={'checkbox'} checked={formik.values.rememberMe}
                   onChange={formik.handleChange}/> Remember me
        </div>
        <div>
            {props.captchaUrl && <img src={props.captchaUrl} alt={'oops'}/>}
            {props.captchaUrl &&
            <input type={'text'} placeholder={'Symbols from image'} name={'captcha'} onChange={formik.handleChange}/>}
        </div>
        <button type="submit">Yes</button>

    </form>
}

export const Login = () => {

    const isAuth = useSelector<RootReduxState>(state => state.authorization.isAuth);
    const captchaUrl = useSelector((state: RootReduxState) => state.authorization.captchaUrl);

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm captchaUrl={captchaUrl}/>
    </div>
}