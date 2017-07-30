import React from 'react';
import classnames from 'classnames';
import ListItem from 'containers/ListItem';
import { DropTarget } from 'react-dnd';
import { columnTypes } from 'sagas/ColumnSaga';

const target = {}

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
    return (
      items.map((item, index) => {
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
  items: React.PropTypes.arrayOf(React.PropTypes.element)
};

export default DropTarget(columnTypes.DRAG, target, collect)(Column);
