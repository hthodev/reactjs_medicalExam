import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllCustomer,
  createNewDoctor,
  editAccount,
  deleteAccount,
  saveDetailDoctor,
} from "../../services/userService";
import "./UserManager.scss";
import ModalDoctor from "./ModalDoctor";
import ModalEditAccount from "./ModalEditAccount";
import { emitter } from "../../utils/emitter";
import ModalUpdateInfoDoctor from "./ModalUpdateInfoDoctor";
import jwt_decode from "jwt-decode";

class CustomerManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalDoctor: false,
      isOpenModalAccount: false,
      isOpenModalUpdateInfo: false,
      accountEdit: {},
      updateInfo: {}
    };
  }

  async componentDidMount() {
    await this.getAllCustomer();
  }
  toggleOpenWindowDoctor = () => {
    this.setState({
      isOpenModalDoctor: !this.state.isOpenModalDoctor,
    });
  };
  toggleOpenWindowAccount = () => {
    this.setState({
      isOpenModalAccount: !this.state.isOpenModalAccount,
    });
  };
  toggleOpenWindowUpdate = () => {
    this.setState({
      isOpenModalUpdateInfo: !this.state.isOpenModalUpdateInfo,
    });
  };

  getAllCustomer = async () => {
    let response = await getAllCustomer();
    if (response && response.errCode === 0) {
      let token = this.props.userInfo;
      let userInfo = jwt_decode(token);

      if(userInfo.roleid === "3") {
        this.setState({
          arrUser: response.result,
        });
      }
      
    }
  };

  handleNewDoctor = async (data) => {
    try {
      let response = await createNewDoctor(data);
      if (response && response.result.errCode !== 0) {
        alert(response.result.message);
      } else {
        this.getAllDoctor();
        this.setState({
          isOpenModalDoctor: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (error) {}
  };
  handleUpdateInfoDoctor = (data) => {
    this.setState({
      isOpenModalUpdateInfo: !this.state.isOpenModalUpdateInfo,
      accountEdit: data,
      updateInfo: data,
    });
           
  }
  doUpdateInfo = async (data) => {
    try {
      let response = await saveDetailDoctor(data);
      if (response && response.result.errCode === 0) {
        this.setState({
          isOpenModalUpdateInfo: false,
        });
      } else {
        alert(response.result.message);
      }

    } catch (error) {
      
    }
  }
  handleEdit = async (data) => {
    this.setState({
      isOpenModalAccount: !this.state.isOpenModalAccount,
      accountEdit: data,
    });
  };
  handleDelete = async (data) => {
    try {
      let response = await deleteAccount(data.id);
      if (response && response.result.errCode === 0) {
        alert(response.result.message);
        this.getAllDoctor();
      } else {
        alert(response.result.message);
      }
    } catch (error) {}
  };
  
  doEditAccount = async (data) => {
    try {
      let response = await editAccount(data.id, data);
      if (response && response.result.errCode === 0) {
        this.setState({
          isOpenModalAccount: false,
        });
        this.getAllDoctor();
      } else {
        alert(response.result.message);
      }
    } catch (error) {}
  };

  render() {

    return (
      <div className="container">
        <ModalDoctor
          isOpen={this.state.isOpenModalDoctor}
          handleNewDoctor={this.handleNewDoctor}
          toggleFromParent={this.toggleOpenWindowDoctor}
        />
        {this.state.isOpenModalAccount && (
          <ModalEditAccount
            isOpen={this.state.isOpenModalAccount}
            editAccount={this.doEditAccount}
            toggleFromParent={this.toggleOpenWindowAccount}
            currentAccount={this.state.accountEdit}
          />
        )}
        {this.state.isOpenModalUpdateInfo && (
          <ModalUpdateInfoDoctor
            isOpen={this.state.isOpenModalUpdateInfo}
            updateInfo = {this.handleUpdateInfoDoctor}
            doUpdate = {this.doUpdateInfo}
            toggleUpdateParent={this.toggleOpenWindowUpdate}
            currentAccount={this.state.accountEdit}
            updateAccount= {this.state.updateInfo}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.toggleOpenWindowDoctor()}
          >
            <i className="mr-3 fas fa-plus" />
            Add Doctor
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrUser &&
              this.state.arrUser.map((item, index) => {
                return (
                 
                  <tr key={index}>
                    
                    <th scope="row">{index}</th>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.roleid === "R2" ? "Doctor" : item.roleid === 'R3' ? "Member" : "Admin" }</td>

                    <td>
                    <button
                        onClick={() => this.handleUpdateInfoDoctor(item)}
                        className="btn btn-custom"
                      >
                        <i className="fa-solid fa-file-pen"></i>
                      </button>
                      <button
                        className="btn btn-custom"
                        onClick={() => this.handleEdit(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-custom"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManager);
