import React, { Component } from "react";
import Items from "./Items";
import ItemSelected from "./ItemSelected";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from "./Map";
// IMPORT UTILS
import { displaySmallImages, displayOriginalImages } from "./utils";

import "./App.css";

export default class App extends Component {
  state = {
    list: []
    // selection: false
  };

  componentDidMount() {
    let url = `https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ list: data }))
      .catch(error => {
        this.setState(error);
      });
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
                    <div className="flex__container">
                      <Items
                        {...props}
                        {...this.state}
                        originalImg={displayOriginalImages}
                      />
                    </div>

                    <Map
                      {...props}
                      {...this.state}
                      originalImg={displayOriginalImages}
                      smallImg={displaySmallImages}
                    />
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
                    itemselected={this.itemselected}
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
