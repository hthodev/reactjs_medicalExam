import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import { LANGUAGES } from "../../utils";
import { getScheduleByDate } from "../../services/userService";
import './DoctorSchedule.scss'
import { FormattedMessage } from "react-intl";
import 'moment/locale/vi'
import BookingModal from "../Patient/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: '',
      allAvalableTime: '',
      isOpenModalTimeModal: '',
      dateSchedule: '',
      timeTypeSchedule: '',
      doctorId: '',
      doctorInfo: ''
    }
  }

  async componentDidMount() {
    let {language} = this.props
    this.setArrDays(language)
  }
  
  componentDidUpdate(prevProps){
    if(this.props.language !==prevProps.language) {
      this.setArrDays(this.props.language)
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  setArrDays = (language) => {
    let allDays = []
    for (let i = 0; i< 7; i++) {
      let object = {};
      if(language === LANGUAGES.VI) {
        let lableVi = object.lable = moment(new Date()).add(i,'days').locale('vi').format('dddd - DD/MM');
        object.lable = this.capitalizeFirstLetter(lableVi)
      } else {
        object.lable = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(object)
    }
    this.setState({
      allDays: allDays
    })
  }
  
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorid = this.props.doctorIdFromParent
      let date = event.target.value
      let response = await getScheduleByDate(doctorid, date)
      if (response && response.result && response.errCode === 0) {
        this.setState({
          allAvalableTime: response.result ? response.result: []
        })
      }
    }
  }

  handleClickScheduleTime = (date, timeType, doctorId) => {
    this.setState({
      isOpenModalTimeModal: true,
      dateSchedule: date,
      timeTypeSchedule: timeType,
      doctorId: doctorId
    })
  }

  closeBooking = () => {
    this.setState({isOpenModalTimeModal: false})
  }

  render() {
    let {allDays, allAvalableTime, isOpenModalTimeModal, dateSchedule, timeTypeSchedule, doctorId} = this.state
    console.log("schedule", this.state);
    let {language} = this.props
    return (
      <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays && allDays.length > 0 && allDays.map((item, index) => {
              return (
                <option value={item.value}
                key={index} >
                  {item.lable}
                </option>
              )
            })
            }
          </select>
        </div>

        <div className="all-available-time" >
         <div className="text-calendar">
          <i className="fas fa-calendar-alt">
            <span><FormattedMessage id="home-header.examination-schedule" /></span>
          </i>
         </div>
         <div className="time-content">
          {allAvalableTime && allAvalableTime.length > 0  ? 
          allAvalableTime.map((item, index) => {
            let timeDisplay = language === LANGUAGES.VI ? 
            item.timeTypeData.valueVI : item.timeTypeData.valueENG;

            return (
              <button key={index}
              onClick={() => this.handleClickScheduleTime(item.date, item.timeType, item.doctorId)}
              > {timeDisplay} </button>
            )
          }) : <FormattedMessage id="home-header.no-schedule"/>}
          
         </div>
        </div>
      </div>
        <BookingModal 
        isOpenModal={isOpenModalTimeModal}
        closeBooking={this.closeBooking}
        dataTime={[dateSchedule, timeTypeSchedule]}
        doctorId={doctorId}
        />
      </>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
