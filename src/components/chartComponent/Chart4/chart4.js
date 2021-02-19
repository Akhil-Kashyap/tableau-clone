import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";

let data = {};
let sorted = {};

//options for charts
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

class chart_fourth extends Component {
  constructor() {
    super();
    this.state = {
      number: 10,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setData = (n) => {
    // this.forceUpdate();
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setData(this.state.number);
  }

  async onChange(e) {
    await this.setState({ number: e.target.value });
  }

  render() {
    let citylabel = [];
    let price = [];

    let data_temp = this.props.data.data.city;

    //sorting the recieved data
    if (Object.keys(this.props.data.data).length !== 0) {
      sorted = data_temp.sort((a, b) => b["city_stat"] - a["city_stat"]);

      sorted.slice(0, this.state.number).map((item, index) => {
        //assigning labels and stats to array
        citylabel.push(item.City);
        price.push(item.city_stat);
      });
    }

    // insitialising data for the map

    data = {
      labels: citylabel,
      datasets: [
        {
          label: "Sales | Profit by City",
          data: price,
          backgroundColor: "#2A5783",
          borderColor: "#6B9CC4",
          borderWidth: 1,
        },
      ],
    };
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
            style={{ marginBottom: "5px", fontSize: "15px", fontWeight: "550" }}
          >
            Sales by City
          </p>
          <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
            <p style={{ margin: "15px", fontSize: "13px" }}>Top N Cities</p>
            <input
              className="input is-small"
              type="text"
              value={this.state.value}
              placeholder="Number"
              onChange={this.onChange}
              style={{
                width: "45px",
                borderColor: "black",
                border: "1px solid",
                height: "20px",
                fontSize: "13px",
                padding: "3px",
                marginTop: "10px",
              }}
            />
          </form>
        </div>
        <HorizontalBar data={data} width={150} height={80} options={options} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(chart_fourth);
