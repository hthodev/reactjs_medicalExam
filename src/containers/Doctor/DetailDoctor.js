import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailDoctor, getMoreInfoDoctor } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import './detaiDoctor.scss'
import DoctorSchedule from "./DoctorSchedule";
import InfoBooking from "../Patient/InfoBooking";
class DetailDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: "",
      markdown: "",
      position: "",
      extraInfor:''
    }
  }

  async componentDidMount() {
    if(this.props.match && this.props.match.params && this.props.match.params.id){
      let id = this.props.match.params.id;
      let response = await getDetailDoctor(id)
      let response2 = await getMoreInfoDoctor(id)

      this.setState({
        info: response.data,
        markdown: response.data.markdown,
        position: response.data.positionData,
        extraInfor:response2.result 
      })
    }

  }

  
  componentDidUpdate(prevProps, prevState, snapshot){

  }
  render() {
    let detailDoctor = this.state
    return (
      <>
        <HomeHeader/>
        <div className="doctor-detail-container">
          <div class="bs-thongtin">
            
            <div class="vung-bao">
              <div class="bs-anh">
                <div style={{
                      backgroundImage: `url(data:image/png;base64${detailDoctor.info.image}`,
                    }}class="luoi" alt="" />
              </div>
              <div class="bs-soluoc">
                <h1 class="bs-ten">
                  {`${detailDoctor.position.valueVI} ${detailDoctor.info.firstName}${detailDoctor.info.lastName}`}
                </h1>
                <div class="bs-tomtat">
                  {detailDoctor && detailDoctor.markdown && detailDoctor.markdown.introduction}
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-doctor">
            <DoctorSchedule doctorIdFromParent={detailDoctor && detailDoctor.info && detailDoctor.info.id ? detailDoctor.info.id : -1}/>
            <InfoBooking doctorIdFromParent={detailDoctor && detailDoctor.info && detailDoctor.info.id }
              extraInfor={this.state.extraInfor}
            />
          </div>
          <div className="detail-info-doctor">
            <div className="content-info-doctor" >
              <div dangerouslySetInnerHTML={{__html: detailDoctor && detailDoctor.markdown && detailDoctor.markdown.contentHTML}}></div>
            </div>

          </div>
          <div className="comment-doctor"></div>
        </div>

        <HomeFooter/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
