import axios from "axios";
import React, { Component } from "react";

class DropDownCities extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.state = {
      data: "",
    };
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  componentDidMount = () => {
    axios
      .get("http://localhost:3000/country")
      .then((res) => this.setState({ data: res.data }));
  };
  render() {
    return (
      <select>
        {this.state.data
          ? this.state.data.map((val, idx) => {
              return <option>{}</option>;
            })
          : ""}
      </select>
    );
  }
}

export default DropDownCities;
