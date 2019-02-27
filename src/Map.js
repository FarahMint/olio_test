import React, { Component } from "react";

import "./App.css";

const API_KEY = `AIzaSyBxgTW-hEQrWjabgvgNEHynxw8mobSzZFQ
 `;
export class Map extends Component {
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

    //  to make the browser access google -> window
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 51.6111, lng: -0.10833 },
      zoom: 8
    });

    // CREATE AN INFO WINDOW
    const infowindow = new window.google.maps.InfoWindow({});

    // for each item we want to create a marker
    list.map(item => {
      // DESTRUCTURE OBJ TO GET LOCATION DETAILS
      const {
        location: { latitude, longitude }
      } = item;

      // CREATE A MARKER
      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: item.title,
        animation: window.google.maps.Animation.DROP
      });
      marker.addListener("click", () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      });

      // CREATE CONTENT
      const contentData = `<div class="info_box"><img src="${this.props.smallImg(
        item
      )}" <h4>${item.title}</h4>
       
      </div> `;

      // 2 EVENT LISTENER -

      marker.addListener("mouseover", () => {
        // set new content
        infowindow.setContent(contentData);
        // open window
        infowindow.open(map, marker);

        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
          infowindow.close();
        }, 1500);
      });

      marker.addListener("click", () => {
        // set new content
        infowindow.setContent(contentData);

        // REDIRECT TO ITEM DETAILS PAGE
        this.props.history.push(`/${item.id}`);

        // open window
        infowindow.open(map, marker);
      });
      return marker;
    });
  };
  componentDidMount() {
    this.loadMap();
  }

  render() {
    return (
      <main>
        <div
          id="map"
          //  style={{ width: "100%", height: "100vh" }}
        />
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
