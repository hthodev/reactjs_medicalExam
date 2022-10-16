import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllUser,
  createNewDoctor,
  editAccount,
  deleteAccount,
} from "../../services/userService";
import "./UserManager.scss";
import ModalDoctor from "./ModalDoctor";
import ModalEditAccount from "./ModalEditAccount";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalDoctor: false,
      isOpenModalAccount: false,
      accountEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUser();
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

  getAllUser = async () => {
    let response = await getAllUser();
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.result,
      });
    }
  };

  handleNewDoctor = async (data) => {
    try {
      let response = await createNewDoctor(data);
      if (response && response.result.errCode !== 0) {
        alert(response.result.message);
      } else {
        this.getAllUser();
        this.setState({
          isOpenModalDoctor: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (error) {}
  };
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
        this.getAllUser();
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
        this.getAllUser();
      } else {
        alert(response.result.message);
      }
    } catch (error) {}
    console.log(data.id, data);
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
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleOpenWindowDoctor()}
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
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.roleid === 2 ? "Member" : "Doctor"}</td>

                    <td>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
