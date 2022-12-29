import React, { Component } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu , doctorMenu } from "./menuApp";
import "./Header.scss";
import Language from "../HomePage/Language";
import { FormattedMessage } from "react-intl";
import _ from "lodash"
import { ROLE_USER } from "../../utils";
class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: "",
      menuApp: []
    }
  }
  componentDidMount(){
    let token = this.props.userInfo;
    let userInfo = jwt_decode(token);
    let menu = []

    if (token && !_.isEmpty(token)){
      let role = userInfo.roleid
      if(role === ROLE_USER.ADMIN){
        menu = adminMenu
      }
      if(role === ROLE_USER.DOCTOR){
        menu = doctorMenu
      }

      this.setState({
        userInfo: userInfo,
        menuApp: menu
      })
    }
    
  }
  render() {
    const { processLogout } = this.props;
    let userInfo = this.state.userInfo
    return (
      <div className="header-container">
        {/* thanh navigator */}

        <div className="left-content">
          <div className="header-tabs-container">
            <Navigator menus={this.state.menuApp} />
          </div>
        </div>

        {/* nút logout */}

        <div className="right-content">
          <span className="welcome">
            {" "}
            <FormattedMessage id="welcome" />
            {(userInfo && userInfo.firstName) ||
            (userInfo && userInfo.lastName)
              ? userInfo.firstName + " " + userInfo.lastName
              : ""}
            !
          </span>
          <div className="language">
            <Language />
          </div>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
