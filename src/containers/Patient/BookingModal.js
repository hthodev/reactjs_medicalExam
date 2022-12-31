import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss"
import {Modal} from "reactstrap"
import {toast} from "react-toastify"
import { postBooking } from "../../services/userService";
class BookingModal extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        phone: '',
        address: '',
        email:'',
        sex: '',
        describe: '',
        who: '',
        date: '',
        timeType: '',
        doctorid:'',
    };
  }

  async componentDidMount() {
    
  }
  componentDidUpdate(prevState) {
   
  }
  handleOnChangeInput = (event, id) => {
    let {dataTime, doctorId} = this.props;
    
    let valueInput = event.target.value;

    let copyState = {...this.state}
    copyState[id] = valueInput
    this.setState({
        ...copyState,
        date: dataTime[0],
        timeType:dataTime[1],
        doctorid: doctorId
    })
  }
  handleOnClickBooking = async() => {
    let response = await postBooking(this.state);

    if(response && response.result && response.result.errCode === 0) {
        toast.info("Booking schedule successfully", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          })
          this.props.closeBooking(false)
    } else {
        toast.error("Booking schedule fail", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          })
    }
    
  }
  
  render() {
    let {isOpenModal, closeBooking, dataTime} = this.props
    console.log("pr", this.props);
    console.log("s", this.state);
    return (
        <Modal
            isOpen={isOpenModal}
            className={"booking-modal-container"}
            size="lg"
            centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"> <FormattedMessage id="home-header.info-booking"/> </span>
                        <span className="right" onClick={closeBooking}>
                            <i className="fas fa-times" />
                        </span>
                    
                    </div>

                    <div className="booking-modal-body">
                        <div className="doctor-infor">

                        </div>

                        <div className="row" >
                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.name" /></label>
                                <input className="form-control"
                                 value={this.state.name} onChange={(event) => this.handleOnChangeInput(event, 'name')}

                                />
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.phone"/> </label>
                                <input className="form-control"
                                value={this.state.phone} onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.email"/> </label>
                                <input className="form-control"
                                value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage  id="home-header.info.address" /> </label>
                                <input className="form-control"
                                value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.who"/> </label>
                                <input className="form-control" value={this.state.who} onChange={(event) => this.handleOnChangeInput(event, 'who')}/>
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.sex"/> </label>
                                <select className="form-control" value={this.state.sex} onChange={(event) => {this.handleOnChangeInput(event, 'sex')}}> 
                                    <option value={0}> Nam </option>
                                    <option value={1}> Nu</option>
                                </select>
                            </div>

                            <div className="col-12 form-group">
                                <label> <FormattedMessage id="home-header.info.describe"/> </label>
                                <textarea className="form-control" rows="3"
                                value={this.state.describe} onChange={(event) => this.handleOnChangeInput(event, 'describe')}
                                />
                            </div>
                            {/* <input value={this.state.date = this.props.dataTime[0]} hidden />
                            <input value={this.state.timeType = this.props.dataTime[1]}  hidden/>
                             */}
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                        onClick={() => this.handleOnClickBooking()}
                        
                        >
                            <FormattedMessage  id="home-header.save"/>
                        </button>

                        <button className="btn-booking-cancel"
                        onClick={closeBooking}
                        >
                            <FormattedMessage id="home-header.cancel" />
                        </button>
                    </div>
                </div>

            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
