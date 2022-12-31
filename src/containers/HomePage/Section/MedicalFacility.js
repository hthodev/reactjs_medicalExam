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
              <FormattedMessage id="section.outstanding-facility" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="section.see-more" />
            </button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="specialty-customize">
                <div className="bg-img  section-medical-facility" />
                <div className=""> Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img  section-medical-facility2" />
                <div className=""> Bệnh viện Chợ Rẫy</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility3" />
                <div className=""> Phòng khám Bệnh viện Đại học Y Dược 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility4" />
                <div className=""> Bệnh viện K - Cơ sở Phan Chu Trinh </div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility5" />
                <div className=""> Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility6" />
                <div className=""> Bệnh viện Ung bướu Hưng Việt</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility7" />
                <div className=""> Hệ thống y tế MEDLATEC</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-img section-medical-facility8" />
                <div className=""> Hệ thống y tế MEDLATEC</div>
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
