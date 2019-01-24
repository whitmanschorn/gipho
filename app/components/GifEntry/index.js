/**
 *
 * GifEntry
 *
 */

import React from "react";
import { LOCALSTORAGE_SAVED_GIFS } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class GifEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHover: false, localData: null };
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickUnSave = this.handleClickUnSave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  fetchData() {
    if(this.props.id && !this.props.images){
      const localData = JSON.parse(localStorage.getItem(`${LOCALSTORAGE_SAVED_GIFS}-${this.props.id}`));
      this.setState({ localData })
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchData();
    }
  }

  handleMouseEnter() {
    this.setState({ isHover: true });
  }
  handleMouseLeave() {
    this.setState({ isHover: false });
  }

  handleClickUnSave() {
    this.props.onClickUnSave(this.props.id);
  }

  handleClickSave() {
    this.props.onClickSave(this.props.id, { ...this.props });
  }

  render() {
    let { id, images, source_tld, search, savedList, showQuery } = this.props;
    const { isHover, localData } = this.state;
    if(!images){
      if(localData){
        images = localData.images
        search = localData.search
        source_tld = localData.source_tld
      } else {
        return <p>loading...</p>
      }
    }
    const { url, width, height } = images.fixed_height;
    const { url: stillUrl } = images.fixed_height_still;
    const isSaved = savedList.includes(id);
    return (
      <div
        className="gif-entry card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <h1>{id}</h1>
        {!isSaved && <button className="save" onClick={this.handleClickSave}><i className="fas fa-save"></i><FormattedMessage {...messages.save} /></button>}
        {isSaved && <button className="unsave" onClick={this.handleClickUnSave}><i className="far fa-save"></i><FormattedMessage {...messages.unsave} /></button>}
        <h3>{source_tld || "source unknown"}</h3>
        {showQuery && <h3>{search || "query unknown"}</h3>}
        <img src={isHover ? url : stillUrl} />
      </div>
    );
  }
}

GifEntry.propTypes = {};

export default GifEntry;
