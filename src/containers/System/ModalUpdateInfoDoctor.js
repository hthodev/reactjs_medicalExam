import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite"
import 'react-markdown-editor-lite/lib/index.css'

class ModalEditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
     email: "",
     id: this.props.id,
     contentMarkdown: "",
     contentHTML: "",
     introduction: "",
    };
  }
   mdParser = new MarkdownIt(/* Markdown-it options */);

  componentDidMount() {
    let data = this.props.currentAccount;
    if (data && !_.isEmpty(data)) {
        this.setState({
          email: data.email,
          id: data.id,
        });
      }
  }

  handleEditorChange = ({html, text}) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html
    })
  };

  handleOnChangIntro =(event)=> {
    this.setState({
      introduction: event.target.value
    })
  }

  handleSaveUpdateInfo = async() => {
   
    this.props.doUpdate(this.state)
    
  };
  toggle = () => {
    this.props.toggleUpdateParent();
  };

  handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
  }


  render() {
    console.log("prop update", this.state);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-doctors-update-container"}
        size="xl"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>UPDATE DOCTOR'S INFORMATION</ModalHeader>
        <ModalBody>
          <div className="modal-doctor-body">
            <div className="input-container" style={{ width: "100%" , marginBottom: "10px"}}>
              <label>Email: </label>
              <input
                type="text"
                value={this.state.email}
                disabled
              />
            </div>
            <label > Introduction: </label>
            <textarea row="5" style={{width: "100%"}}
            onChange={(event) => {
              this.handleOnChangIntro(event)
            }}
            value={this.state.introduction}
            />
            <MdEditor  style={{ height: '500px' } } 
            renderHTML={text => this.mdParser.render(text)} 
            onChange={this.handleEditorChange} />
           
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAccount);
