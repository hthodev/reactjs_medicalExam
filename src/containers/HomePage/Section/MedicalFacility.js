import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-parent">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              {" "}
              <FormattedMessage id="section.popular-specialty" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="section.see-more" />
            </button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="specialty-customize">
                <div className="bg-img  section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img  section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility" />
                <div className=""> Co xuong 1</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
