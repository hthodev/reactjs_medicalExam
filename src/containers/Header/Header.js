import React, { Component } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import Language from "../HomePage/Language";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  render() {
    const { processLogout } = this.props;
    let token = this.props.userInfo;
    let adminInfo = jwt_decode(token);

    console.log(adminInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}

        <div className="left-content">
          <div className="header-tabs-container">
            <Navigator menus={adminMenu} />
          </div>
        </div>

        {/* nút logout */}

        <div className="right-content">
          <span className="welcome">
            {" "}
            <FormattedMessage id="home-header.welcome" />
            {(adminInfo && adminInfo.firstName) ||
            (adminInfo && adminInfo.lastName)
              ? adminInfo.firstName + " " + adminInfo.lastName
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
