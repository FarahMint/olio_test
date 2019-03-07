import React, { Component } from "react";
import Items from "./Items";
import ItemSelected from "./ItemSelected";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from "./Map";

// IMPORT UTILS
import { displaySmallImages, displayOriginalImages, fetchData } from "./utils";

import "./App.css";

export default class App extends Component {
  state = {
    list: [],
    isHovered: {},
    activeMarker: false
  };

  // ------------------------------------
  // Display all ITEMS
  // ------------------------------------
  getListItems() {
    fetchData().then(list => {
      this.setState(prevState => ({
        list
      }));
    });
  }

  // hover
  handleMouseEnter = index => {
    this.setState(prevState => {
      return {
        isHovered: { ...prevState.isHovered, [index]: true },
        activeMarker: true
      };
    });

    // animation={activeMarker ? (item.name === activeMarker.title ? '1' : '0') : '0'}
  };

  handleMouseLeave = index => {
    this.setState(prevState => {
      return {
        isHovered: { ...prevState.isHovered, [index]: false },
        activeMarker: false
      };
    });
  };

  // handleMarker(marker) {
  //   let flagItem = this.state.list.filter(item => item.id === marker.id);
  //   console.log(flagItem);
  // }

  componentDidMount() {
    this.getListItems();

    // const  handleMarker = (marker) =>{
    //   let flagItem = this.state.list.filter(item => item.id === marker.id);
    //   console.log(flagItem);
    // }
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <nav className="header-logo">
            <span>O</span>
          </nav>

          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <div className="container">
                    <Map
                      {...props}
                      {...this.state}
                      originalImg={displayOriginalImages}
                      smallImg={displaySmallImages}
                      handleMouseEnter={this.handleMouseEnter}
                      handleMouseLeave={this.handleMouseLeave}
                    />
                    <div className="flex__container">
                      <Items
                        {...props}
                        {...this.state}
                        originalImg={displayOriginalImages}
                        handleMouseEnter={this.handleMouseEnter}
                        handleMouseLeave={this.handleMouseLeave}
                        handleMarker={this.handleMarker}
                      />
                    </div>
                  </div>
                )}
              />

              <Route
                exact
                path="/:id"
                render={props => (
                  <ItemSelected
                    {...this.state}
                    {...props}
                    originalImg={displayOriginalImages}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}
