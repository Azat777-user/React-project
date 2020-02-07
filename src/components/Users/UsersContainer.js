import React from "react"; 
import { 
  follow, 
  unfollow, 
  setCurrentPage, 
  toggleIsFollowingInProgress,
  getUsersThunkCreator,
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/users-selectors";

class UsersContainer extends React.Component {

  componentDidMount(){
    let {currentPage, sizePage} = this.props;
    this.props.getUsers(currentPage, sizePage);
  }

  onPageChanged = (pageNumber) => {
    let {sizePage} = this.props;
    this.props.getUsers(pageNumber, sizePage);
  }

  render() {
    console.log("Render Users")
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users 
          totalUsersCount = {this.props.totalUsersCount}
          sizePage = {this.props.sizePage}
          currentPage = {this.props.currentPage}
          onPageChanged = {this.onPageChanged}
          users = {this.props.users}
          unfollow = {this.props.unfollow}
          follow = {this.props.follow}  
          followingInProgress = {this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => ({
//   users: state.usersPage.users,
//   sizePage: state.usersPage.sizePage,
//   totalUsersCount: state.usersPage.totalUsersCount, 
//   currentPage: state.usersPage.currentPage,
//   isFetching: state.usersPage.isFetching,
//   followingInProgress: state.usersPage.followingInProgress,
// })

let mapStateToProps = (state) => {
  console.log("mapStateToProps Users"); 
  return {
    users: getUsers(state),
    sizePage: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state), 
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}
  
export default compose(
  connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, 
    toggleIsFollowingInProgress, getUsers: getUsersThunkCreator
  }),
  //withAuthRedirect
)(UsersContainer);
 