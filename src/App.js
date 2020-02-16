import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter, BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import { connect, Provider } from 'react-redux';
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp();
  }

  render(){
    if(!this.props.initialized){
      return <Preloader />;
    }
  
    return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Route path="/profile/:userId?" render={()=> {return <ProfileContainer />}} />
              <Route path="/dialogs" render={()=>{ return <DialogsContainer />}} />
              <Route path="/users"   render={()=><UsersContainer />}/>
              <Route path="/music"   render={()=><Music />}/>
              <Route path="/news"    render={()=><News />}/>
              <Route path="/login"   render={()=><Login />}/>
              <Route path="/settings" render={()=><Settings />} />
            </React.Suspense> 
          </div>
        </div>
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
}); 

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App);

const MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;