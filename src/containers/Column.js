import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from 'containers/ListItem';
import { DropTarget } from 'react-dnd';
import { columnTypes } from 'sagas/ColumnSaga';
import { selectors, actions } from 'sagas/ItemSaga';

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const { id, moveItemToColumn } = props;

    moveItemToColumn(item, id);

    return { moved: true };
  }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Column extends React.Component {

  renderItems(columnItems, columnKey) {
    return (
      columnItems.map((item, index) => {
        return (
          <ListItem item={item} columnId={columnKey} key={`${columnKey}-${index}`} />
        )
      })
    );
  }

  getClassName(isOver) {
    return classnames(
      'column',
      { 'over': isOver }
    );
  }

  render() {
    const { renderItems, getClassName } = this;
    const { findColumnItems, isOverCurrent, canDrop, connectDropTarget, id } = this.props;
    const columnItems = findColumnItems(id);

    return connectDropTarget (
      <div id={id} className={ getClassName(isOverCurrent) }>
        <h4>Column {id} - ({columnItems.length})</h4>
        <ul>
          { renderItems(columnItems, id) }
        </ul>
      </div>
    );
  }
}

Column.defaultProps = {
  id: React.PropTypes.number,
  items: React.PropTypes.func.isRequired,
  moveItemToColumn: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    findColumnItems: selectors.findColumnItems(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(columnTypes.DRAG, target, collect)(Column));
