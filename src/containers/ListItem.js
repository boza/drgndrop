import React from 'react';
import { DragSource } from 'react-dnd';
import { listItemTypes } from 'sagas/ItemSaga';


const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
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

  render() {
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <li>
        List Item
      </li>
    )
  }
}

ListItem.defaultProps = {
  item: React.PropTypes.shape({}),
  isDragging: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired
};

export default DragSource(listItemTypes.DRAG, itemSource, collect)(ListItem);
