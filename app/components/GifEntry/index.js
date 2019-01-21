/**
 *
 * GifEntry
 *
 */

import React from "react";
import { LOCALSTORAGE_SAVED_GIFS } from "../../utils/constants";

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class GifEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickUnSave = this.handleClickUnSave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ isHover: true });
  }
  handleMouseLeave() {
    this.setState({ isHover: false });
  }

  handleClickUnSave(id) {
    this.props.onClickUnSave(this.props.id);
  }

  handleClickSave(id) {
    this.props.onClickSave(this.props.id);
  }

  render() {
    const { id, images, source_tld, savedList } = this.props;
    const { isHover } = this.state;
    const { url, width, height } = images.fixed_height;
    const { url: stillUrl } = images.fixed_height_still;
    const isSaved = savedList.includes(id);
    return (
      <div
        className="gif-entry"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <h1>{id}</h1>
        {!isSaved && <button onClick={this.handleClickSave}>Save</button>}
        {isSaved && <button onClick={this.handleClickUnSave}>UnSave</button>}
        <h3>{source_tld || "source unknown"}</h3>
        <img src={isHover ? url : stillUrl} />
      </div>
    );
  }
}

GifEntry.propTypes = {};

export default GifEntry;
