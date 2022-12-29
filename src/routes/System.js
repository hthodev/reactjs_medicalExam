import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import DoctorManager from "../containers/System/DoctorManager";
import CustomerManager from "../containers/System/CustomerManager";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Header";
import PlanDoctor from "../containers/Patient/Doctor/PlanDoctor";
import ModalUpdateInfoDoctor from "../containers/System/ModalUpdateInfoDoctor";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className="system-container">
          <div className="system-list">
            <Switch>
            
              <Route path="/system/doctor-manage" component={DoctorManager} />
              <Route path="/system/customer-manage" component={CustomerManager} />
              <Route path="/system/update-info" component={ModalUpdateInfoDoctor} />
              <Route path="/system/schedule-plan-manager" component={PlanDoctor} />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
