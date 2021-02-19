import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setYear } from "../../actions/yearAction";
import { setData } from "../../actions/dataAction";
import { setOption } from "../../actions/optionAction";

class chartParams extends Component {
  constructor() {
    super();
    this.state = {
      year: 0,
      option: "Sales",
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.handleChartChange = this.handleChartChange.bind(this);
  }

  handleChartChange() {
    //calling api to update click when the parameter are changed
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        Authorization: "Token " + localStorage.Token, // Indicates the content
      },
    };

    fetch("https://tableau-clone.herokuapp.com/click-data", putMethod)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  async onChange(e) {
    await this.setState({ year: parseInt(e.target.value, 10) }, () =>
      this.props.setYear(this.state.year)
    );

    this.props.setData(this.props.option.option, this.state.year);
    //calling function averytime parameter changes
    this.handleChartChange();
  }

  async onChangeOption(e) {
    await this.setState({ option: e.target.value }, () =>
      this.props.setOption(this.state.option)
    );

    this.props.setData(this.state.option, this.props.year.year);
    //calling function averytime parameter changes
    this.handleChartChange();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          fontSize: "14px",
          paddingBottom: "20px",
          paddingLeft: "5%",
          paddingTop: "25px",
        }}
      >
        <div style={{ marginRight: "25px" }}>
          <p style={{ marginBottom: "5px", fontWeight: "550" }}>
            Select Sales | Profit
          </p>
          <div className="select">
            <select onChange={this.onChangeOption}>
              <option value="Sales">Sales</option>
              <option value="Profit">Profit</option>
            </select>
          </div>
        </div>

        <div>
          <p style={{ marginBottom: "5px", fontWeight: "550" }}>Select Year</p>
          <div className="select">
            <select onChange={this.onChange}>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

chartParams.propTypes = {
  setYear: PropTypes.func.isRequired,
  year: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  year: state.year,
  option: state.option,
});

export default connect(mapStateToProps, { setYear, setOption, setData })(
  chartParams
);
