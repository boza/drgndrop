import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from 'containers/ListItem';
import { DropTarget } from 'react-dnd';
import { columnTypes } from 'sagas/ColumnSaga';
import { selectors, actions } from 'sagas/ItemSaga';

const DEFAULT_ITEMS = ["One", "TWO"];

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

  rendeItems(items, columnKey) {
    const columnItems = items.get(columnKey) || DEFAULT_ITEMS;
    return (
      columnItems.map((item, index) => {
        return (
          <ListItem key={`${columnKey}-${index}`} />
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
    const { rendeItems, getClassName } = this;
    const { items, isOverCurrent, canDrop, connectDropTarget, id } = this.props;

    return connectDropTarget (
      <div className={ getClassName(isOverCurrent) }>
        <ul>
          { rendeItems(items, id) }
        </ul>
      </div>
    );
  }
}

Column.defaultProps = {
  id: React.PropTypes.number,
  items: React.PropTypes.arrayOf(React.PropTypes.element),
  moveItemToColumn: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    items: selectors.items(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(columnTypes.DRAG, target, collect)(Column));
