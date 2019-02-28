import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default class ItemSelected extends Component {
  state = {
    itemView: []
  };

  render() {
    // console.log(this.state);
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
              <div
                key={items.id}
                onMouseEnter={() => this.props.handleMouseEnter(items.id)}
                onMouseLeave={() => this.props.handleMouseLeave(items.id)}
                className={
                  this.props.isHovered[items.id]
                    ? "item__container selected"
                    : "item__container"
                }
              >
                <Link to={`/${items.id}`}>
                  <div className="innercard__img">
                    <img
                      src={`${this.props.originalImg(items)}`}
                      alt={items.title}
                      className="card__img"
                      title={items.title}
                    />
                  </div>
                  <h1 className="card-title">{items.title}</h1>

                  {/* {items.title > 25 ? (
                    <h1 className="card-title">{items.title}</h1>
                  ) : (
                    <h1 className="card-title">
                      {items.title.substring(0, 25)}...
                    </h1>
                  )} */}
                  <div className="innercard__details">
                    <img
                      src={small}
                      alt={first_name}
                      className="innercard__avatar"
                      title={first_name}
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
