import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { columnTypes } from 'sagas/ColumnSaga';
import { actions } from 'sagas/ItemSaga';

const itemSource = {
  beginDrag(props) {
    const { item: {id, text}, columnId } = props
    return {
      id: id,
      columnId: columnId,
      text: text
    };
  },

  endDrag(props, monitor, component) {
    const { columnId, removeItemToColumn } = props
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    removeItemToColumn(item, columnId);
  }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class ListItem extends React.Component {

  getClassName(isDragging) {
    if (isDragging) {
      return "dragging";
    }
    return null;
  }

  render() {
    const { item, isDragging, connectDragSource } = this.props;
    const { getClassName } = this;

    return connectDragSource(
      <li id={item.id} className={ getClassName(isDragging) }>
        { item.text }
      </li>
    )
  }
}

ListItem.defaultProps = {
  item: React.PropTypes.shape({}),
  columnId: React.PropTypes.number.isRequired,
  isDragging: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  removeItemToColumn: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(DragSource(columnTypes.DRAG, itemSource, collect)(ListItem));
