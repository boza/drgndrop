import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Column from 'containers/Column'
import { selectors, actions } from 'sagas/ColumnSaga';
// import { selectors, actions } from 'sagas/ItemSaga';

const renderColumns = (columnsCount, items) => {
  let counter = 0;
  const columns = []
  while(counter < columnsCount) {
    counter++
    columns.push(
      <Column items={items[counter]} />
    )
  }
  return columns;
}

export const DragNDropPage = ({ columnsCount }) => {
  return (
    <div className="index">
      { renderColumns(columnsCount) }
    </div>
  );
};

DragNDropPage.propTypes = {
  actions: PropTypes.object.isRequired,
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragNDropPage);
