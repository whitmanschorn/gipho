/**
 *
 * Favorites
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { compose } from "redux";
import { Link } from "react-router-dom";
import GifEntry from "components/GifEntry";
import { LOCALSTORAGE_SAVED_GIFS } from "../../utils/constants";

import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [],
      query: '',
    };

    this.onClickUnSave = this.onClickUnSave.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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


  updateFilters(e) {
    if (e) e.preventDefault();
    const { query } = this.state;
    let saved = JSON.parse(localStorage.getItem(LOCALSTORAGE_SAVED_GIFS)) || [];
    if(query && query.length) {
      saved = saved.filter(item => {
        if(!query || !query.length) return true
        const localItem = JSON.parse(localStorage.getItem(`${LOCALSTORAGE_SAVED_GIFS}-${item}`))
        return localItem !== null && (localItem.source_tld && localItem.source_tld.includes(query)) || (localItem.search && localItem.search.includes(query))
      })      
    }
    this.setState({ saved });
  }


  handleInputChange(event) {
    event.preventDefault();
    this.setState({ query: event.target.value });
  }

  render() {
    const { saved, query } = this.state;
    return (
      <div>
        <div className="card">
          <Link to="/"><FormattedMessage {...messages.back} /></Link>
          <h3>{saved.length} <FormattedMessage {...messages.savedCount} /></h3>
          <form onSubmit={this.updateFilters}>
            <FormattedMessage {...messages.placeholder}>
              {(msg) => (
                <input
                  type="text"
                  placeholder={msg}
                  name="q"
                  value={query}
                  onChange={this.handleInputChange}
                />
              )}
            </FormattedMessage>
            <button><FormattedMessage {...messages.go} /></button>
          </form>
        </div>
        <div className="card">
          {saved.map((item, index) => <GifEntry showQuery key={index} id={item} savedList={saved} onClickUnSave={this.onClickUnSave} />)}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(Favorites);
