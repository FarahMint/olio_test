import React, { Component } from "react";
import "./App.css";

const API_KEY = `AIzaSyBxgTW-hEQrWjabgvgNEHynxw8mobSzZFQ`;

export class Map extends Component {
  state = {
    markers: []
  };
  loadMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
    );
    //Initialize initMap => for JS to render the init map
    //To keep it visible we convert it to the window obj
    window.initMap = this.initMap;
  };

  initMap = () => {
    // GET DATA FROM STATE
    const { list } = this.props;
    let markers = [];

    //For the browser access google -> window
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 51.6111, lng: -0.10833 },
      zoom: 8
    });
    this.map = map;

    // CREATE AN INFO WINDOW
    const infowindow = new window.google.maps.InfoWindow({});
    this.infowindow = infowindow;
    // for each item we want to create a marker
    list.map(item => {
      // DESTRUCTURE OBJ TO GET LOCATION DETAILS
      const {
        location: { latitude, longitude }
      } = item;

      // CREATE A MARKER
      let marker = new window.google.maps.Marker({
        id: item.id,
        position: { lat: latitude, lng: longitude },
        map: map,
        title: item.title,
        animation: window.google.maps.Animation.DROP,
        activeMarker: this.props.activeMarker
      });
      this.marker = marker;

      // CREATE CONTENT
      const contentData = `<div class="info_box"><img src="${this.props.smallImg(
        item
      )}"</div> `;

      // EVENTS LISTENER

      marker.addListener("mouseover", () => {
        this.props.handleMouseEnter(item.id);
        // set new content
        infowindow.setContent(contentData);

        // open window
        infowindow.open(map, marker);

        // console.log(item.id);
        // *** ANIMATION ****
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
      });

      marker.addListener("mouseout", () => {
        // open window
        infowindow.close();
        // this.props.handleMouseEnter(item.id);
        this.props.handleMouseLeave(item.id);
      });

      // LISTENER CLICK TO  REDIRECT TO ITEM DETAILS PAGE
      marker.addListener("click", () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        // set new content
        infowindow.setContent(contentData);
        this.props.history.push(`/${item.id}`);
        // open window
        infowindow.open(map, marker);
      });

      markers = markers.concat(marker);

      return this.marker;
    });
    this.setState(prevState => {
      return {
        markers
      };
    });
  };

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    let item_flag;
    this.props.list.map(item => {
      if (this.props.isHovered[item.id] !== prevProps.isHovered[item.id]) {
        item_flag = this.state.markers.find(marker => marker.id === item.id);
        const contentData = `<div class="info_box"><img src="${this.props.smallImg(
          item
        )}"</div> `;
        this.infowindow.setContent(contentData);
        this.props.activeMarker
          ? this.infowindow.open(this.map, item_flag)
          : this.closeWindow();
      }
      return item_flag;
    });
  }

  closeWindow() {
    this.infowindow.close();
  }

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}

export default Map;

function loadScript(url) {
  // select the first script tag
  const index = window.document.getElementsByTagName("script")[0];

  // create script tag
  const script = window.document.createElement("script");
  //  access property of tag
  script.src = url;
  script.async = true;
  script.defer = true;

  //  append the child - use insertBefore so we will select the index - the reference \ the 1rst script tag
  // then select its parent node
  // & then insert script before it to keep our script @ the beginning of our list of script

  index.parentNode.insertBefore(script, index);
}

//  <script async defer
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
// </script>
