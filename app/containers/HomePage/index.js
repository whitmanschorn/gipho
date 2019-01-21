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
import Pagination from "components/Pagination";
import GifEntry from "components/GifEntry";
import { GIPHY_API_KEY } from '../../utils/secrets'


function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        q: "cheeseburgers",
        api_key: GIPHY_API_KEY,
        limit: 20,
        offset: 0,
        rating: 'g',
        lang: 'en',
      },
      data: [],
      meta: {},
      pagination: {},
      loading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {

    const { name, value } = event.target;
    console.log({ name, value });
    const { query } = this.state;
    const newQueryState = { ...query, [name]: value };
    this.setState({
      query: newQueryState
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log({ e, s: this.state });
    const goodies = await fetch(`https://api.giphy.com/v1/gifs/search?${objToQueryString(this.state.query)}`, { mode: "cors", })
    const results = await goodies.json();
    const { data, meta, pagination } = results;
    console.log({ results });
    this.setState({ data, meta, pagination })
  }

  render() {
    const { data, pagination } = this.state;
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
        {data.length > 1 && <div>
          {data.map((item, index) => <GifEntry {...item} key={index} />)}
          <Pagination {...pagination} />
        </div>}
      </div>
    );
  }
}
