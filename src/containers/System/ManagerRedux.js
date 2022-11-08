import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class ManagerRedux extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="manager-redux-container">
        <div className="title">abc xyz</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerRedux);
