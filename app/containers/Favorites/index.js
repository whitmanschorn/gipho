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
    };

    this.onClickUnSave = this.onClickUnSave.bind(this);
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

  render() {
    const { saved } = this.state;
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Link to="/">Search</Link>
        <h3>{saved.length} saved images</h3>
        <hr />
        {saved.map((item, index) => <GifEntry key={index} id={item} savedList={saved} onClickUnSave={this.onClickUnSave} />)}
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
