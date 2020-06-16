import React from "react";
import s from './ProfileInfo.module.css';
import style from "../../common/FormsControls/FormsControls.module.css";
import { reduxForm } from "redux-form";
import { createField, Textarea, Input } from "../../common/FormsControls/FormsControls";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form className={s.formAboutMe} onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={style.formSummarError}>{error}</div>}
      <div>
        <b>Full Name</b>: {createField("Full Name", "fullName", Input, [])}
      </div>
      <div>
        <b>Looking for a job</b>: {createField("", "lookingForAJob", Input, [], {type: "checkbox"})}
      </div>
     
      <div>
        <b>My professional skills</b>: {createField("My professional skills", "lookingForAJobDescription", Textarea, [], {className: s.ProfSkills} )}
        </div>
      
      <div>
        <b>About me</b>: {createField("About Me", "aboutMe", Textarea, [],{className: s.ProfSkills} )}
      </div>
      <div>
        <b>Contacts</b>:{
        Object.keys(profile.contacts).map(key => {
          return (
            <div key={key} className={s.contact}>
              <b>{key}: {createField(key, "contacts." + key, Input, [])}</b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm; 