import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Column from 'containers/Column'
import { selectors, actions } from 'sagas/ColumnSaga';
import { selectors as itemSelectors, actions as itemActions } from 'sagas/ItemSaga';

const DEFAULT_ITEMS = ["One", "TWO"];

const renderColumns = (columnsCount, items) => {
  let counter = 0;
  const columns = []
  while(counter < columnsCount) {
    counter++
    const columnItems = items.get(counter) || DEFAULT_ITEMS

    columns.push(
      <Column key={counter} items={columnItems} />
    )
  }
  return columns;
}

export const DragNDropPage = ({ items, columnsCount, addColumn }) => {
  return (
    <div>
      <a onClick={addColumn}>+ Add more columns</a>
      <div className="index">
        { renderColumns(columnsCount, items) }
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
    items: itemSelectors.items(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(itemActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragNDropPage);
