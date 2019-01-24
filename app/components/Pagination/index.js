/**
 *
 * Pagination
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Pagination(props) {
  const PAGE_SIZE = 20
  console.log('pagination', {props});
  const { pagination, onClickPagination } = props;
  const { offset, count, total_count } = pagination;
  const showPrev = offset > 0;
  const showNext = offset + count < total_count;
  //showNext, showPrev, next query, prev query
  // pageIndex
  return <div>
    <div>Showing {offset} - { offset + count } of { total_count }</div>
    {showPrev && <button onClick={() => onClickPagination({ offset: offset - PAGE_SIZE })}>back</button>}
    {showNext && <button onClick={() => onClickPagination({ offset: offset + PAGE_SIZE })}>next</button>}
  </div>;
}

Pagination.propTypes = {};

export default Pagination;
