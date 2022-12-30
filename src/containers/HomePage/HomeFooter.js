import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss"
class HomeFooter extends Component {
  render() {
    return (
      <div class="chantrang-2">
        <div class="vung-bao">
          <div class="hang">
            <div class="cot-4 title">
              <small>© 2022 BookingCare.</small>
            </div>
            <div class="cot-8 chu-phai-vua">
              <a href="#">
                 <i className="fa-brands fa-facebook size"></i>
              </a>
              <a href="#">
                 <i className="fa-brands fa-youtube size"/>
              </a>
              <a href="#" >
              <i className="fa-brands fa-twitter size"></i>
              </a>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
