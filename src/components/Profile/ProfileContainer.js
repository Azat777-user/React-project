import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";    
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push("/login");
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidUpdate(prevProps, prevsState){
        if(this.props.match.params.userId !=  prevProps.match.params.userId){
            this.refreshProfile();
        }
       
    }

    componentDidMount(){
        this.refreshProfile();
    }

    render(){
        //console.log("Render Profile");
        return (
            <Profile 
                {...this.props} 
                profile={this.props.profile} 
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state) => {
    // console.log("mapStateToProps Profile"); 
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    })
}; 

export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);