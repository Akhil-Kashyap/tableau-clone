import React, { Component } from "react";
import { connect } from "react-redux";

import data1 from "./data.js";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

//counter variable which is used as key for GEOJson
let ctr = 1;

class chart_third extends Component {
  constructor() {
    super();
    this.state = {
      lat: 37.8,
      lng: -97,
      zoom: 4,
    };

    //color setting based on the stats
    this.getColor = (d) => {
      return d > 50000
        ? "#4B0082"
        : d > 20000
        ? "#191970"
        : d > 10000
        ? "#000080"
        : d > 5000
        ? "#00008B"
        : d > 4000
        ? "#0000CD"
        : d > 3000
        ? "#0000FF"
        : d > 2000
        ? "#4169E1"
        : "	#6495ED";
    };

    this.getColor = this.getColor.bind(this);
    this.style = (feature) => {
      return {
        fillColor: this.getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    };
    this.style = this.style.bind(this);
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const polygon = data1.features[0].geometry.coordinates[0];
    let temp = data1;
    temp = data1;
    if (Object.keys(this.props.data.data).length !== 0) {
      this.props.data.data.state.map((item, index) => {
        temp.features.map((i, ind) => {
          if (i.properties.name == item.State) {
            i.properties.density = item.state_stat.toFixed(2);
          }
        });
      });

      ctr += 1;
    }

    return (
      <div>
        <p
          style={{ marginBottom: "15px", fontSize: "15px", fontWeight: "550" }}
        >
          Sales by Type
        </p>

        <MapContainer
          className="map"
          center={position}
          zoom={this.state.zoom}
          style={{ height: "500px" }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            key={ctr}
            data={temp}
            style={this.style}
            onEachFeature={(feature, layer) =>
              layer.bindPopup(
                "<b>" +
                  feature.properties.name +
                  "</b>" +
                  "<br/><b>Sales | Profit by Year: </b>" +
                  feature.properties.density +
                  " $"
              )
            }
          />
          )
        </MapContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(chart_third);
