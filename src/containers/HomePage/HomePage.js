import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import DoctorOutStanding from "./Section/DoctorOutStanding";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import { fetchTopDoctor } from "../../store/actions";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <DoctorOutStanding settings={settings} />
        <HomeFooter />
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
  return { loadTopDoctor: () => dispatch(fetchTopDoctor()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
