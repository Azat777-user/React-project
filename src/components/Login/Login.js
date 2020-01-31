import React from "react";
import { reduxForm, Field } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validtors/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import s from "../common/FormsControls/FormsControls.module.css";

const maxLength50 = maxLengthCreator(50);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    placeholder={"Email"} 
                    name={"email"} 
                    component={Input} 
                    validate={[required, maxLength50]}
                />
            </div>
            <div>  
                <Field 
                    validate={[required, maxLength50]}
                    name={"password"} 
                    placeholder={"password"} 
                    component={Input}
                />
            </div>
            <div>
                <Field 
                    component={Input} 
                    name={"rememberMe"} 
                    type="checkbox" 
                />Remember me
            </div>
            {
                props.error &&
                <div className={s.formSummarError}>
                    {props.error}
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