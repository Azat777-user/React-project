import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validtors/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import s from "../common/FormsControls/FormsControls.module.css";

const maxLength50 = maxLengthCreator(50);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", Input, [required, maxLength50], {className: s.email})}
            {createField("Password", "password", Input, [required, maxLength50], {className: s.password, type: ""})}
            {createField(null, "rememberMe", Input, null, {type: "checkbox"}, "Remember me")}
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField("Symbol from image", "captcha", Input, [required], {})}
            {
                error &&
                <div className={s.formSummarError}>
                    {error}
                </div>
            }
            <div>
                <button className={s.btnSubmit}>Login</button>
            </div>
        </form>   
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if(props.isAuth){
        return <Redirect to={"/profile"} />
    }
    return (
        <div className={s.loginPage}>
            <div className={s.loginPageForm}>
                <h1>LOGIN</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
            </div>  
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(Login);