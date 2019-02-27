import React, { Component } from "react";
import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";

export default class ItemSelected extends Component {
  state = {
    items: [],

    isSaved: false
  };

  async getSelectedItem(id) {
    this.getItemWithLocalStorage();

    let items = await this.props.list.filter(item => item.id === id);

    this.setState(() => ({ items, isSaved: true }));

    this.saveStateToLocalStorage();
  }

  async getItemWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = await JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    let saveStorage;
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      saveStorage = localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
    return saveStorage;
  }

  componentWillMount() {
    // console.log("item selected component will mount");
  }
  componentDidMount() {
    // console.log("item selected component did mount");
    const id = parseInt(this.props.match.params.id);
    this.getSelectedItem(id);
  }
  // componentDidUpdate() {
  //   console.log("item selected component did update");
  // }

  render() {
    // console.log(this.state.items);
    return (
      <React.Fragment>
        {this.state.items.map(item => {
          const {
            location: { town }
          } = item;
          const {
            user: { first_name }
          } = item;
          const {
            user: {
              current_avatar: { small }
            }
          } = item;

          const {
            value: { price, currency }
          } = item;

          const {
            reactions: { likes }
          } = item;

          return (
            <div className="container__details" key={item.id}>
              <div className="innercard__img">
                <img
                  src={`${this.props.originalImg(item)}`}
                  alt={item.title}
                  className="details-selected__img"
                />

                <div className="innercard__img">
                  <p>{first_name}</p>

                  <img
                    src={small}
                    alt={first_name}
                    className="innercard__avatar details"
                  />
                  <h3>{item.title}</h3>

                  {/* <FontAwesomeIcon icon="heart" /> */}
                  <p>
                    {likes} {price} {currency}
                  </p>
                </div>
                <p>{town}</p>
              </div>
              <div className="intro__details">
                <p>{item.description}</p>
                <p>{item.collection_notes}</p>

                <button className="btn__back">
                  <Link to="/">back to browse view</Link>
                </button>
              </div>
              <div className="intro__location" />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
