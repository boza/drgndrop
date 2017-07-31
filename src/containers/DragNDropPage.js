import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Column from 'containers/Column'

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { selectors, actions } from 'sagas/ColumnSaga';

const renderColumns = (columnsCount) => {
  let counter = 0;
  const columns = []
  while(counter < columnsCount) {
    counter++
    columns.push(
      <Column id={counter} />
    )
  }
  return columns;
}

export const DragNDropPage = ({ columnsCount, addColumn }) => {
  return (
    <div>
      <a onClick={addColumn}>+ Add more columns</a>
      <div className="index">
        { renderColumns(columnsCount) }
      </div>
    </div>
  );
};

DragNDropPage.propTypes = {
  addColumn: PropTypes.func.isRequired,
  columnsCount: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    columnsCount: selectors.columnsCount(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
  };
}

export default DragDropContext(HTML5Backend)(connect(
  mapStateToProps,
  mapDispatchToProps
)(DragNDropPage));
