import React from 'react';
import ListItem from 'containers/ListItem';

class Column extends React.Component {

  rendeItems(items) {
    return (
      [1,2].map((item) => {
        return (
          <li>
            <ListItem />
          </li>
        )
      })
    );
  }

  render() {
    const { rendeItems } = this;
    const { items } = this.props;

    return (
      <div className="column">
        <ul>
          { rendeItems(items) }
        </ul>
      </div>
    );
  }
}

Column.defaultProps = {
  items: React.PropTypes.arrayOf(React.PropTypes.element)
};

export default Column;
