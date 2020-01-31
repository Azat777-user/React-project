
import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validtors/validators";


const maxLength100 = maxLengthCreator(100);

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => {
    return <DialogItem name={d.name} key={d.id} id={d.id} />
  });  

  let messagesElements = state.messages.map((m) => {
    return <Message message={m.message} key={m.id} id={m.id} />
  });

  let newAddMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  }    


  if(!props.isAuth) return <Redirect to='login' />;

  return (
    <div className={s.dialogs}>
      <span className={s.header}>Dialogs</span>
      <div className={s.dialogsItem}>
        <div>{ dialogsElements }</div>
        <div className={s.wrapperMessage}>
          <AddMessageFormRedux onSubmit={newAddMessage} /> 
        </div>
      </div>
      <div className={s.messages}>
        { messagesElements}
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field 
        component={Textarea}
        validate={[required, maxLength100]}
        name={"newMessageBody"}
        placeholder="Write new Message" 
        className={s.inputMessage}
      />
      <div className={s.sendMessage}>
          <button>Send Message</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({form:"DialogAddMessageForm"})(AddMessageForm);

export default Dialogs;
