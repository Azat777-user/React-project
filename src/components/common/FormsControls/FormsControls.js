import React from "react";
import s from "./FormsControls.module.css";

const FormsControls = ({input, meta, child, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
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