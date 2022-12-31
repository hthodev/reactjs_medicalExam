import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class DoctorOutStanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }
  handleViewDoctor = (doctor) => {
   this.props.history.push(`detail-doctor/${doctor.id}`)
    console.log("view doctor", doctor.id);
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className="section-parent section-background">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              {" "}
              <FormattedMessage id="section.outstanding-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="section.see-more" />
            </button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imgBase64;
                  if (item.image) {
                    imgBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVI}, ${item.firstName} ${item.lastName}`;
                  let nameEng = `${item.positionData.valueENG}, ${item.lastName} ${item.firstName} `;

                  return (
                    <div className="specialty-customize" key={index} onClick={()=> this.handleViewDoctor(item)}>
                      <div className="outer-bg">
                        <div
                          className="bg-img  section-doctor-outstanding"
                          style={{
                            backgroundImage: `url(data:image/png;base64${imgBase64}`,
                          }}
                        />
                      </div>
                      <div className="position text-center">
                        <div className="">
                          {language === LANGUAGES.VI ? nameVi : nameEng}
                        </div>
                        <div className=""> Co xuong khop</div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorOutStanding));
