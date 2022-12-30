import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss"
import {Modal} from "reactstrap"

class BookingModal extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  async componentDidMount() {
    
  }
  componentDidUpdate(prevState) {
   
  }

  
  render() {
    let {isOpenModal, closeBooking, dateTime} = this.props
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

                        <div className="price">
                            <label><FormattedMessage id="home-header.info.price"/> </label> 500.000VND
                        </div>

                        <div className="row" >
                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.name" /></label>
                                <input className="form-control"/>
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.phone"/> </label>
                                <input className="form-control"/>
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.email"/> </label>
                                <input className="form-control"/>
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage  id="home-header.info.address" /> </label>
                                <input className="form-control"/>
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.who"/> </label>
                                <input className="form-control"/>
                            </div>

                            <div className="col-6 form-group">
                                <label> <FormattedMessage id="home-header.info.sex"/> </label>
                                <input className="form-control"/>
                            </div>

                            <div className="col-12 form-group">
                                <label> <FormattedMessage id="home-header.info.describe"/> </label>
                                <textarea className="form-control" rows="3"/>
                            </div>
                            
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                        onClick={closeBooking}
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
