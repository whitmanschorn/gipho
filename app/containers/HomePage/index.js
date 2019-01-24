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
import RandomWords from "random-words";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import Pagination from "components/Pagination";
import GifEntry from "components/GifEntry";
import { changeLocale } from "containers/LanguageProvider/actions"
import { GIPHY_API_KEY } from "../../utils/secrets";
import { LOCALSTORAGE_SAVED_GIFS } from "../../utils/constants";
import { Link } from "react-router-dom";

const getRandomWords = () => RandomWords({ min: 1, max: 2, join: ' '})

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join("&");
}

const DEFAULT_QUERY = {
  q: "cheeseburgers",
  api_key: GIPHY_API_KEY,
  limit: 20,
  offset: 0,
  rating: "g",
  lang: "en"
}

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: DEFAULT_QUERY,
      data: [],
      meta: {},
      pagination: {},
      previousQueryText: '',
      saved: JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [],
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeWithCallback = this.handleInputChangeWithCallback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickUnSave = this.onClickUnSave.bind(this);
    this.onClickPagination = this.onClickPagination.bind(this);
    this.onRandom = this.onRandom.bind(this);
  }

  handleInputChange(e) {
    this.handleInputChangeWithCallback(e, null)
  }

  handleInputChangeWithCallback(event, callback) {
    const { name, value } = event.target;
    const { query } = this.state;
    const newQueryState = { ...query, [name]: value };
    this.setState({
      query: newQueryState
    }, callback);
  }

  onRandom() {
    this.handleInputChangeWithCallback({ target: { name: 'q', value: getRandomWords() }}, this.handleSubmit);
  }

  onClickSave(id, item) {
    const saved = JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [];
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem(LOCALSTORAGE_SAVED_GIFS, JSON.stringify(saved));
      localStorage.setItem(`${LOCALSTORAGE_SAVED_GIFS}-${id}`, JSON.stringify(item));
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
    this.setState({ data, meta, pagination, previousQueryText: this.state.query.q });
  }

  onClickPagination(queryUpdate) {
    const newQuery = { ...this.state.query, ...queryUpdate };
    this.setState({ query: newQuery }, this.handleSubmit);
  }

  render() {
    const { data, pagination, query, previousQueryText } = this.state;
    const savedList = JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [];
    return (
      <div>
        <div className="card">
          <Link to="/faves"><FormattedMessage {...messages.faves} /></Link>
          <p><FormattedMessage {...messages.header} /> <button onClick={this.onRandom}><i className="fas fa-dice-three"></i> Random</button></p>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search for gifs"
              name="q"
              value={query.q}
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
                source_tld={item.source_tld}
                search={previousQueryText}
                key={index}
                savedList={savedList}
                onClickSave={this.onClickSave}
                onClickUnSave={this.onClickUnSave}
              />
            ))}
            <Pagination pagination={pagination} onClickPagination={this.onClickPagination} />
          </div>
        )}
        <div className="card">
          <div> locations: <button onClick={this.setLanguageRU}>RU</button> <button>EN</button></div>
        </div>
      </div>
    );
  }
}
