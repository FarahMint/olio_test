import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default class ItemSelected extends Component {
  state = {
    itemView: []
  };

  render() {
    console.log(this.props.list);
    return (
      <React.Fragment>
        <div className="flex__title">
          <h1>Start sharing food</h1>
        </div>
        <div className="list__container">
          {this.props.list.map(items => {
            const {
              user: { first_name }
            } = items;
            const {
              user: {
                current_avatar: { small }
              }
            } = items;
            return (
              <div key={items.id} className="item__container">
                <Link to={`/${items.id}`}>
                  <h3>{items.title}</h3>
                  <div className="innercard__img">
                    <img
                      src={`${this.props.originalImg(items)}`}
                      alt={items.title}
                      className="card__img"
                      title={items.title}
                    />
                  </div>
                  <div className="innercard__details">
                    <img
                      src={small}
                      alt={first_name}
                      className="innercard__avatar"
                    />
                    <span>{first_name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}