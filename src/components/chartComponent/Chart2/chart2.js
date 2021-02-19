import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";

import { connect } from "react-redux";

let data = {};

//options for chart is set
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

class chart_second extends Component {
  constructor() {
    super();
    this.state = {
      filter: "bar",
    };

    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    await this.setState({ filter: e.target.value }, this.setData);
  }

  render() {
    //chart data is set based on changing parameters
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Spetember",
      "October",
      "November",
      "December",
    ];

    let sales = [];
    if (Object.keys(this.props.data.data).length !== 0) {
      this.props.data.data.yearly.map((item, index) => {
        sales[parseInt(item.month, 10) - 1] = item.monthly_stat;
      });
    }

    data = {
      labels: month,
      datasets: [
        {
          label: "Order Date",
          data: sales,
          fill: false,
          backgroundColor: "#4E79A7",
          borderColor: "#2A5783",
          borderWidth: 2,
          lineTension: 0,
        },
      ],
    };

    let chart;
    //condition for setting bar graph or line chart
    if (this.state.filter === "bar") {
      chart = <Bar data={data} height={80} width={150} options={options} />;
    } else {
      chart = (
        <Line data={data} height={80} width={150} options={options}></Line>
      );
    }

    return (
      <div>
        <div
          className="selection"
          style={{
            fontSize: "12px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              marginBottom: "15px",
              fontSize: "15px",
              fontWeight: "550",
            }}
          >
            Sales over Time
          </p>
          <div className="select">
            <select onChange={this.onChange}>
              <option>Select Chart type</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
            </select>
          </div>
        </div>
        {chart}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(chart_second);
