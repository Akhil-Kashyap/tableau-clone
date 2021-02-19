import React, { Component } from "react";
import { connect } from "react-redux";

import { setData } from "../../actions/dataAction";

import "./chartComponent.css";
import Chart1 from "./Chart1/chart1";
import Chart2 from "./Chart2/chart2";
import Chart3 from "./Chart3/chart3";
import Chart4 from "./Chart4/chart4";
import ChartParam from "../chartParams/chartParams";

class chartComponent extends Component {
  componentDidMount() {
    this.props.setData("Sales", 2017);
  }
  //holds all the chart component
  render() {
    return (
      <div>
        <ChartParam></ChartParam>
        <div className="chartArea">
          <div className="row">
            <div className="col s1">
              <Chart1></Chart1>
            </div>
            <div className="col s1">
              <Chart2></Chart2>
            </div>
          </div>

          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col s1">
              <Chart3></Chart3>
            </div>
            <div className="col s1">
              <Chart4></Chart4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  year: state.year,
  option: state.option,
  data: state.data,
});

export default connect(mapStateToProps, { setData })(chartComponent);
