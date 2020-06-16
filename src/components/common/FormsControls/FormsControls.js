import React from "react";
import s from "./FormsControls.module.css";
import { Field } from "redux-form"

const FormsControls = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormsControls {...props} >
            <textarea {...input}{...restProps}></textarea>
        </FormsControls>
    )
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormsControls {...props} >
            <input {...input}{...restProps}></input>
        </FormsControls>
    )
}

export const createField = (placeholder, name, component, validate, props = {}, text = "") => (
<div>
    <Field 
        placeholder={placeholder} 
        name={name} 
        component={component} 
        validate={validate}
        {...props}
    /><span className={s.rememberMe}>{text}</span>
</div>)