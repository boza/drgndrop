import React from 'react';

class ListItem extends React.Component {

  render() {
    return (
      <li>
        List Item
      </li>
    )
  }
}

ListItem.defaultProps = {
  item: React.PropTypes.shape({})
};

export default ListItem;
