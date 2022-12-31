import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";

class Specialty extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <div className="section-parent section-background">
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
                <div className="bg-img  section-specialty" />
                <div className=""> Cơ xương khớp</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img  section-specialty2" />
                <div className=""> Thần kinh</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-specialty3" />
                <div className=""> Tiêu hoá</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-specialty4" />
                <div className=""> Tim mạch</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-specialty5" />
                <div className=""> Tai mũi họng</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-specialty6" />
                <div className=""> Cột sống</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-specialty7" />
                <div className=""> Y học cổ truyền</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-specialty8" />
                <div className=""> Da liễu</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
