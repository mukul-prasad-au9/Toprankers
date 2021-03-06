import React, { Component } from "react";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return <button onClick={this.btnClickedHandler}>Delete</button>;
  }
}

export default Delete;
