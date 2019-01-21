/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import { GIPHY_API_KEY } from '/utils/secrets'
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: {
      q: "",
      api_key: API_KEY

    },
    results: [],
    loading: false,

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { query } = this.state;
    const newQueryState = { [name]: value, ...query };
    this.setState({
      query: newQueryState
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log({ e, s: this.state });
  }

  render() {
    return (
      <div className="search">
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <p>Look for gifs</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search for gifs"
            name="q"
            value={this.state.query.q}
            onChange={this.handleInputChange}
          />
          <button>Go</button>
        </form>
      </div>
    );
  }
}
