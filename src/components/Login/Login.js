import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validtors/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import s from "../common/FormsControls/FormsControls.module.css";

const maxLength50 = maxLengthCreator(50);

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", Input, [required, maxLength50])}
            {createField("Password", "password", Input, [required, maxLength50], {type: ""})}
            {createField(null, "rememberMe", Input, null, {type: "checkbox"}, "Remember Me")}
            {
                error &&
                <div className={s.formSummarError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
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
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if(props.isAuth){
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(Login);