import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  async componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState, snapshot){

  }
  render() {
    return (
      <>
        <HomeHeader/>
       
            <div > abc</div>
        <HomeFooter/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
