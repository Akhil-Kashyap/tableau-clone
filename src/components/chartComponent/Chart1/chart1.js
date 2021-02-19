import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";

let data = {};
//options for the chart is set
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

class chart_first extends Component {
  constructor() {
    super();
    this.state = {
      filter: "segment",
    };

    this.onChange = this.onChange.bind(this);
  }

  //function which sets data based on the parameters
  setData = (option) => {
    let l = [];
    let d = [];
    if (option === "segment") {
      if (Object.keys(this.props.data.data).length !== 0) {
        this.props.data.data.segment.map((item, index) => {
          l[index] = item.Segment;
          d[index] = item.segment_stat;
        });
      }

      data = {
        labels: l,
        datasets: [
          {
            label: "Sales | Profit by Year",
            data: d,
            backgroundColor: "#2A5783",
            borderColor: "#2A5783",
            borderWidth: 2,
          },
        ],
      };
    }

    if (option === "category") {
      if (Object.keys(this.props.data.data).length !== 0) {
        this.props.data.data.category.map((item, index) => {
          l[index] = item.Category;
          d[index] = item.category_stat;
        });
      }
      data = {
        labels: l,
        datasets: [
          {
            label: "Sales | Profit by Year",
            data: d,
            backgroundColor: "#2A5783",
            borderColor: "#2A5783",
            borderWidth: 2,
          },
        ],
      };
    }
    if (option === "region") {
      if (Object.keys(this.props.data.data).length !== 0) {
        this.props.data.data.region.map((item, index) => {
          l[index] = item.Region;
          d[index] = item.region_stat;
        });
      }
      data = {
        labels: l,
        datasets: [
          {
            label: "Sales | Profit by Year",
            data: d,
            backgroundColor: "#2A5783",
            borderColor: "#2A5783",
            borderWidth: 2,
          },
        ],
      };
    }
    if (option === "subcategory") {
      if (Object.keys(this.props.data.data).length !== 0) {
        this.props.data.data.sub_category.map((item, index) => {
          l[index] = item.Sub_category;
          d[index] = item.subcategory_stat;
        });
      }
      data = {
        labels: l,
        datasets: [
          {
            label: "Sales | Profit by Year",
            data: d,
            backgroundColor: "#2A5783",
            borderColor: "#2A5783",
            borderWidth: 2,
          },
        ],
      };
    }
  };

  //change is fliter is managed
  async onChange(e) {
    await this.setState(
      { filter: e.target.value },
      this.setData(e.target.value)
    );
  }

  render() {
    this.setData(this.state.filter);
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
            Sales by Type
          </p>
          <div className="select">
            <select onChange={this.onChange}>
              <option>Select Type</option>
              <option value="segment">Segment</option>
              <option value="category">Category</option>
              <option value="subcategory">Sub Category</option>
              <option value="region">Region</option>
            </select>
          </div>
        </div>
        <HorizontalBar data={data} width={150} height={80} options={options} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(chart_first);
