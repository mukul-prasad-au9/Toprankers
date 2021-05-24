import React, { Component } from "react";

class Save extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return <button onClick={this.btnClickedHandler}>Save</button>;
  }
}

export default Save;
