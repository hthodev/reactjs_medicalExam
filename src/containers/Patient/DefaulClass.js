import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DefaulClass.scss"
import DatePicker from "../../../components/Input/DatePicker"
import { getAllCode, postSaveBulkSchedule } from "../../../services/userService";
import jwt_decode from "jwt-decode";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class DefaulClass extends Component {
 
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
    
  }
  componentDidUpdate(prevState) {
   
  }

  
  render() {
    return (
        <div className="" >abv</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaulClass);
