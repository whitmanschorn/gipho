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
import { GIPHY_API_KEY } from "../../utils/secrets";
import { LOCALSTORAGE_SAVED_GIFS } from "../../utils/constants";
import { Link } from "react-router-dom";

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join("&");
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
        rating: "g",
        lang: "en"
      },
      data: [],
      meta: {},
      pagination: {},
      saved: JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [],
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickUnSave = this.onClickUnSave.bind(this);
    this.onClickPagination = this.onClickPagination.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { query } = this.state;
    const newQueryState = { ...query, [name]: value };
    this.setState({
      query: newQueryState
    });
  }

  onClickSave(id, item) {
    const saved = JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [];
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem(LOCALSTORAGE_SAVED_GIFS, JSON.stringify(saved));
      localStorage.setItem(`${LOCALSTORAGE_SAVED_GIFS}-${id}`, JSON.stringify(item));
      console.log(`${LOCALSTORAGE_SAVED_GIFS}-${id}`);
      this.setState({ saved });
    }
  }

  onClickUnSave(id) {
    let saved = JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [];
    if (saved.includes(id)) {
      saved = saved.filter(item => item !== id);
      localStorage.setItem(LOCALSTORAGE_SAVED_GIFS, JSON.stringify(saved));
      localStorage.removeItem(`${LOCALSTORAGE_SAVED_GIFS}-${id}`)
      this.setState({ saved });
    }
  }

  async handleSubmit(e) {
    if (e) e.preventDefault();
    const gifRequest = await fetch(
      `https://api.giphy.com/v1/gifs/search?${objToQueryString(
        this.state.query
      )}`,
      { mode: "cors" }
    );
    const results = await gifRequest.json();
    const { data, meta, pagination } = results;
    this.setState({ data, meta, pagination });
  }

  onClickPagination(queryUpdate) {
    const newQuery = { ...this.state.query, ...queryUpdate };
    this.setState({ query: newQuery }, this.handleSubmit);
  }

  render() {
    const { data, pagination } = this.state;
    const savedList =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [];
    return (
      <div className="search">
        <div className="card">
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
          <p>Look for gifs</p>
        </div>
        <div className="card">
          <Link to="/faves">Faves</Link>
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
        {data.length > 1 && (
          <div className="card">
            {data.map((item, index) => (
              <GifEntry
                id={item.id}
                images={item.images}
                key={index}
                savedList={savedList}
                onClickSave={this.onClickSave}
                onClickUnSave={this.onClickUnSave}
              />
            ))}
            <Pagination pagination={pagination} onClickPagination={this.onClickPagination} />
          </div>
        )}
      </div>
    );
  }
}
