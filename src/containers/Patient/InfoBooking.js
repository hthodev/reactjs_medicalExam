import React, { Component } from "react";
import { connect } from "react-redux";
import { getMoreInfoDoctor, getScheduleByDate } from "../../services/userService";
import "./InfoBooking.scss"
import { FormattedMessage } from "react-intl";


class InfoBooking extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
     isShowDetaillInfor: false,
     extraInfor: ''
    };
  }

  async componentDidMount() {
    
  }
  componentDidUpdate(prevState, prevProps) {
    if(prevProps.extraInfor !== prevState.extraInfor){
      let {extraInfor} = this.props
      this.setState({
        extraInfor: extraInfor
      })
    }
    
  }
  showHideDetailInfor = (status) => {
    this.setState({
        isShowDetaillInfor: status
    })
  }
  
  render() {
    let {isShowDetaillInfor, extraInfor} = this.state
    let info = this.props.extraInfor
    return (
        <div className="doctor-extra-infor-container" >
            <div className="content-up">
                <div className="text-address"><FormattedMessage id='home-header.info.address'/></div>
                <div className="name-clinic">{extraInfor.nameClinic}</div>
                <div className="detail-address"> {extraInfor.addressClinic} </div>
            </div>
            <div className="content-down">
                {isShowDetaillInfor === false && 
                <div className="short-infor">
                    <FormattedMessage id={"home-header.info.price"}/> {extraInfor.priceId} VND
                    <span onClick={()=> this.showHideDetailInfor(true)}>
                    <FormattedMessage id={"home-header.info.show"}/>
                    </span>
                </div>
                }
                {isShowDetaillInfor === true && 
                <>
                <div className="title-price"> <FormattedMessage id={"home-header.info.price"}/> {extraInfor.priceId} VND</div>
                <div className="detail-infor">
                    <div className="note">
                        {extraInfor.note}
                    </div>
                    <div className="payment">
                    <FormattedMessage id={"home-header.info.payment"}/> {extraInfor.paymentId}
                    </div>
                    <div className="hide-price">
                        <span onClick={()=> this.showHideDetailInfor(false)}>
                            <FormattedMessage id={"home-header.info.hide"}/>
                        </span>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
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
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoBooking);
