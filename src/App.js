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
    isHovered: {}
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
    this.setState({ loading: true });
  }

  // hover
  handleMouseEnter = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };

  //  if hover get function to start the marker

  componentDidMount() {
    // let url = `https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json`;
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => this.setState({ list: data }))
    //   .catch(error => {
    //     this.setState(error);
    //   });

    this.getListItems();
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
                      isHovering={this.state.isHovered}
                    />
                    <div className="flex__container">
                      <Items
                        {...props}
                        {...this.state}
                        originalImg={displayOriginalImages}
                        handleMouseEnter={this.handleMouseEnter}
                        handleMouseLeave={this.handleMouseLeave}
                        isHovering={this.state.isHovered}
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
