import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm, Field } from "redux-form";
import { Textarea } from "../../common/FormsControls/FormsControls";


const MyPosts = React.memo((props) => {
  console.log('render');
  // let posts = [
  //   {id:"1", message:"Hi, how are you?",       likeCount:"10"},
  //   {id:"2", message:"Hi, it's my first post", likeCount:"15"},
  //   {id:"3", message:"Hello my friends" ,      likeCount:"18"},
  // ];

  let postsElements = props.posts.map(p=>{
    return <Post key={p.id} message={p.message} likeCount={p.likesCount}/>
  });

  let onAddPost = (values) => {
    props.addPost(values.newPostBody);
  }

  return (
    <div className={s.postsBlock}>
      <div>
        <AddNewPostFormRedux onSubmit={onAddPost} />
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
});

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div className={s.postsBlock}>
      <div className={s.postContainer}>
        <Field 
          placeholder="Write new post" 
          name={"newPostBody"}
          component={Textarea} 
        />
        <button className={s.addPostBtn}>Add Post</button>
      </div>
    </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({form:"ProfileAddNewPostForm"})(AddNewPostForm);
export default MyPosts;
