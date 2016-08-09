const React = require('react');
const PropTypes = React.PropTypes;
const Draggable = require('../constants/draggable_constants');
const DragSource = require('react-dnd').DragSource;

const OptionsActions = require('../actions/options_actions');

const propertySource = {
  beginDrag(props) {
    return { name: props.name, query: props.query };
  },

  endDrag(props, monitor) {

    // props.query.properties.push(props.name);
    //
    //
    // OptionsActions.changeOptions(props.query);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Property = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
    const connectDragSource = this.props.connectDragSource;
    const isDragging = this.props.isDragging;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        {this.props.name}
      </div>
    );
  }
});

module.exports = DragSource(Draggable.PROPERTY, propertySource, collect)(Property);
