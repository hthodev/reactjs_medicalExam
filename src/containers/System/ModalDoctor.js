import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
class ModalDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      gender: "0",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        gender: "0",
      });
    });
  }

  handleOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  validateInput = () => {
    let isValid = true;
    let arrInput = Object.keys(this.state);

    for (let i = 0; i < arrInput.length - 1; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleCreateDoctor = () => {
    let isValid = this.validateInput();
    if (isValid === true) {
      this.props.handleNewDoctor(this.state);
    }
  };
  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-doctor-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create New Doctor
        </ModalHeader>
        <ModalBody>
          <div className="modal-doctor-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangInput(event, "email")}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => this.handleOnChangInput(event, "password")}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangInput(event, "firstName")
                }
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangInput(event, "lastName")}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container phone">
              <label>Phone</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangInput(event, "phone")}
                value={this.state.phone}
              />
            </div>
            <div className="input-container gender">
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                onChange={(event) => this.handleOnChangInput(event, "gender")}
                value={this.state.gender}
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
            <div className="input-container address">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleCreateDoctor()}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDoctor);
