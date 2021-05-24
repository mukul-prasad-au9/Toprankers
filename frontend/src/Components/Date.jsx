import React, { Component } from "react";

class Date extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return <input type="date" />;
  }
}

export default Date;
