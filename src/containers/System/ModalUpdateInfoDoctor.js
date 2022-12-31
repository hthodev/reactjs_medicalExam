import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getAllCode, saveDoctorMore } from "../../services/userService";
import { LANGUAGES } from "../../utils";
import "./ModalUpdateInfoDoctor.scss"

class ModalEditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      id: this.props.id,
      contentMarkdown: "",
      contentHTML: "",
      introduction: "",

      listPrice: "",
      listPayment: "",
      listProvince: "",
      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  mdParser = new MarkdownIt(/* Markdown-it options */);

  getAllRequireInfoDoctor = async () => {
    let resPrice = await getAllCode("PRICE");
    let resPayment = await getAllCode("PAYMENT");
    let resProvince = await getAllCode("PROVINCE");

    if (
      resPrice &&
      resPrice.errCode === 0 &&
      resPayment &&
      resPayment.errCode === 0 &&
      resProvince &&
      resProvince.errCode === 0
    ) {
      this.setState({
        listPrice: resPrice.result,
        listPayment: resPayment.result,
        listProvince: resProvince.result,
      });
    }
  };

  componentDidMount() {
    this.getAllRequireInfoDoctor();
    this.defaulValue();
    let data = this.props.currentAccount;
    if (data && !_.isEmpty(data)) {
      this.setState({
        email: data.email,
        id: data.id,
      });
    }
  }
  defaulValue = () => {
    let {language} = this.props
    if(language == 'vi'){
      this.setState({
        selectPrice: 200000,
        selectPayment: 'Tiền mặt',
        selectProvince: 'Hà Nội'
    })
    } else if(language == 'en'){
      this.setState({
        selectPrice: 10,
        selectPayment: 'Cash',
        selectProvince: 'Ha Noi'
    })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleOnChangIntro = (event) => {
    this.setState({
      introduction: event.target.value,
    });
  };

  handleSaveUpdateInfo = async () => {
    this.props.doUpdate(this.state);

    await saveDoctorMore(this.state)
  };
  toggle = () => {
    this.props.toggleUpdateParent();
  };

  handleEditorChange({ html, text }) {
  }

  handleOnChangeSelectPrice = async (event) => {
    let selectPrice = event.target.value;
    this.setState({
      selectPrice: selectPrice,
    });
  };
  handleOnChangeSelectPayment = async (event) => {
    let selectPayment = event.target.value;
    this.setState({
      selectPayment: selectPayment,
    });
  };
  handleOnChangeSelectProvince = async (event) => {
    let selectProvince = event.target.value;
    this.setState({
      selectProvince: selectProvince,
    });
  };
  onChangeInfor = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });


  }
  render() {
    let { language } = this.props;
    let { listPrice, listPayment, listProvince } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-doctors-update-container"}
        size="xl"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>
          UPDATE DOCTOR'S INFORMATION
        </ModalHeader>
        <ModalBody>
          <div className="modal-doctor-body">
            <div
              className="input-container"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <label>Email: </label>
              <input type="text" value={this.state.email} disabled />
            </div>
            <label> Introduction: </label>
            <textarea
              row="5"
              style={{ width: "100%" }}
              onChange={(event) => {
                this.handleOnChangIntro(event);
              }}
              value={this.state.introduction}
            />

            <div className="more-info-extra row">
              <div className="col-4 form-group content-select">
                <label>Chon gia</label>
                <select
                  onChange={(event) => this.handleOnChangeSelectPrice(event)}
                >
                  {listPrice &&
                    listPrice.length > 0 &&
                    listPrice.map((item, index) => {
                      return (
                        <option
                          value={
                            language === LANGUAGES.VI
                              ? item.valueVI
                              : item.valueENG
                          }
                          key={index}
                        >
                          {language === LANGUAGES.VI
                            ? `${item.valueVI} VND`
                            : `${item.valueENG} USD`}
                        </option>
                      );
                    })}
                </select>
                    </div>

                <div className="col-4 form-group content-select">
                  <label>Chon phuong thuc</label>
                  <select
                    onChange={(event) =>
                      this.handleOnChangeSelectPayment(event)
                    }
                  >
                    {listPayment &&
                      listPayment.length > 0 &&
                      listPayment.map((item, index) => {
                        return (
                          <option
                            value={
                              language === LANGUAGES.VI
                                ? item.valueVI
                                : item.valueENG
                            }
                            key={index}
                          >
                            {language === LANGUAGES.VI
                              ? `${item.valueVI}`
                              : `${item.valueENG}`}
                          </option>
                        );
                      })}
                  </select>
                </div>

              <div className="col-4 form-group content-select">
                <label>Chon tinh thanh</label>
                <select
                  onChange={(event) => this.handleOnChangeSelectProvince(event)}
                >
                  {listProvince &&
                    listProvince.length > 0 &&
                    listProvince.map((item, index) => {
                      return (
                        <option
                          value={
                            language === LANGUAGES.VI
                              ? item.valueVI
                              : item.valueENG
                          }
                          key={index}
                        >
                          {language === LANGUAGES.VI
                            ? `${item.valueVI}`
                            : `${item.valueENG}`}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-4 form-group content-input">
                <label>Ten phong kham</label>
                <input className="form-control" onChange={(event) => this.onChangeInfor(event, 'nameClinic')} 
                value={this.state.nameClinic}/>
              </div>

              <div className="col-4 form-group content-input">
                <label>dia chi phong kham</label>
                <input className="form-control" onChange={(event) => this.onChangeInfor(event, 'addressClinic')} 
                value={this.state.addressClinic}/>
              </div>

              <div className="col-4 form-group content-input">
                <label>Note</label>
                <input className="form-control" onChange={(event) => this.onChangeInfor(event, 'note')} 
                value={this.state.note}/>
              </div>
            </div>

            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => this.mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUpdateInfo()}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
  
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAccount);
