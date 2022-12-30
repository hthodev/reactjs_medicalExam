import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagerSchedule.scss"
import DatePicker from "../../../components/Input/DatePicker"
import { getAllCode, postSaveBulkSchedule } from "../../../services/userService";
import jwt_decode from "jwt-decode";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class ManagerSchedule extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
     listDoctor: [],
     currentDate: '',
     rangeTime: []
    };
  }

  async componentDidMount() {
    await this.getTimeAllCode()
    let token = this.props.userInfo;
    let userInfo = jwt_decode(token);
    this.setState({
      userInfo: userInfo
    })
  }
  componentDidUpdate(prevState) {
    if(prevState.rangeTime) {
      let data =  this.state.rangeTime;
      if( data  && data.length > 0) {
        data= data.map(item => ({...item, isSelected: false}))
      }
      this.setState({
        rangeTime: data
      })
    }
  }

  getTimeAllCode = async() => {
    let data = await getAllCode("TIME")
    if (data) {
      this.setState({
        rangeTime: data.result
      })
    }
  }

  handleOnChangDatePicker = (date) => {
    this.setState({
      currentDate: date[0]
    })
  }

  handleClickBtnTime = (time) => {
    let {rangeTime} = this.state
    if(rangeTime && rangeTime.length > 0 ){
      rangeTime = rangeTime.map(item => {
        if(item.id === time.id) item.isSelected = !item.isSelected
        return item
      })
      this.setState({
        rangeTime: rangeTime
      })
    }
  }
  handleSaveSchedule = async () => {
    let {currentDate, rangeTime} = this.state

    let result = [];
    if (!currentDate) {
      toast.error("Invalid date!", {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    let formatedDate = new Date(currentDate).getTime()
    if(rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(item => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          let {userInfo} = this.state
          object.doctorid = userInfo.id
          object.date = formatedDate;
          object.timeType = schedule.keyMap
          result.push(object)
        })
      } else{
        toast.error("Invalid selected time!",{
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        })
        return
      }
    }
    let response = await postSaveBulkSchedule({
      arrSchedule: result,
      doctorid: this.state.userInfo.id,
      formatedDate: formatedDate,
    })
    console.log("post info", response);
  }

  render() {
    let {rangeTime, userInfo} = this.state
    let {language} = this.props

    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="menu.system.doctor.manager-schedule.manager-schedule"/> 
          </div>

          <div className="container">
            <div className="row" >
              <div className="col-6 form-group">
                <label >
                  <FormattedMessage id="menu.system.doctor.manager-schedule.choose-doctor"/>: 
                  </label>
                  <input 
                  className="input-name"
                  value={`${userInfo.firstName} ${userInfo.lastName}`}
                  disabled
                  />
              </div>

              <div className="col-6 form-group" >
                <label>
                  <FormattedMessage id="menu.system.doctor.manager-schedule.choose-date"/>
                </label>
                <DatePicker
              onChange={this.handleOnChangDatePicker}
              className="form-control"
              value={this.state.currentDate}
              minDate={new Date()}
              />
              </div>
              

              <div className="col-12 pick-hour-container" >
                {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                  return (
                    <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} 
                    key={index} 
                    onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVI: item.valueENG}
                    </button>
                  )
                })}
              </div>

              <div className="col-12">
                <button className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}>
                  <FormattedMessage id="menu.system.doctor.manager-schedule.save"/>
                </button>
              </div>
            </div>

          </div>
        </div>

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
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSchedule);
