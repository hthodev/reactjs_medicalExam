import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";
class ModalEditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      image: "",
      gender: "0",
      preImg: "",
    };
  }
  componentDidMount() {
    let data = this.props.currentAccount;
    let imgBase64 = "";
    if (data.image) {
      imgBase64 = new Buffer(data.image, "base64").toString("binary");
    }
    if (data && !_.isEmpty(data)) {
      this.setState({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone,
        image: imgBase64,
        gender: String(data.gender),
        id: data.id,
      });
    }
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

    for (let i = 0; i < arrInput.length - 2; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveAccount = () => {
    let isValid = this.validateInput();
    if (isValid === true) {
      this.props.editAccount(this.state);
    }
  };
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangImage = async (event) => {
    let data = event.target.files;
    let file = data[0];


    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        image: base64,
      });
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-doctor-container"}
        size="lg"
        
      >
        <ModalHeader toggle={() => this.toggle()}>Edit New Account</ModalHeader>
        <ModalBody>
          <div className="modal-doctor-body">
            <div className="input-container" style={{ width: "100%" }}>
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangInput(event, "email")}
                value={this.state.email}
                disabled
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
            <div className="load-img">
              <div>
                <label class="form-label" for="customFile">
                  Default file input example
                </label>
                <input
                  type="file"
                  class="form-control"
                  onChange={(event) => {
                    this.handleOnChangImage(event);
                  }}
                />
              </div>

              <div className="preview-image">
                {this.state.image ? (
                  <div
                    className="image-content"
                    style={{
                      backgroundImage: `url(data:image/png;base64${this.state.image}`,
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveAccount()}
          >
            Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAccount);
