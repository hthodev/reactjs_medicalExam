import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { connect } from "react-redux";
import "./Language.scss";

class Language extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <UncontrolledDropdown>
        <DropdownToggle color="light">
          <FormattedMessage id="common.languages" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            className={LANGUAGES.VI ? "language-vi.active" : "language-vi"}
            onClick={() => {
              this.changeLanguage(LANGUAGES.VI);
            }}
          >
            🇻🇳 Việt Nam
          </DropdownItem>
          <DropdownItem
            className={LANGUAGES.EN ? "language-en.active" : "language-en"}
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
          >
            🇺🇸 English
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
