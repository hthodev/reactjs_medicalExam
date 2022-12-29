import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUser = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    let result = await handleLogin(this.state.username, this.state.password);

    try {
      if (result && result.message.errCode !== 0) {
        this.setState({
          errMessage: result.message.message,
        });
      } else if (result && result.message.errCode === 0) {
        this.props.userLoginSucces(result.message.acess_token);
      }
    } catch (error) {
      if (result && result.response.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group">
              <label>UserName</label>
              <input
                type="text"
                className="form-control login-input"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChangeUser(event);
                }}
                placeholder="enter your username"
              />
            </div>

            <div className="col-12 form-group ">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangePassword(event);
                  }}
                  className="form-control login-input"
                  placeholder="enter your password"
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye eye-custom"
                        : "far fa-eye-slash eye-custom"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>

            <div className="col-12 login-a login-a">
              <span>Forgot your password?</span>
            </div>

            <div className="col-12 login-a">
              <span> Or login with</span>
            </div>
            <div className="col-12 mt-3 login-icon">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSucces: (userInfo) => {
      dispatch(actions.userLoginSuccess(userInfo));
    },
    // userLoginFail: () => dispatch(actions.userLoginFail),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
