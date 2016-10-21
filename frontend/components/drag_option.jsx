const React = require('react');
const PropTypes = React.PropTypes;
const Draggable = require('../constants/draggable_constants');
const DragSource = require('react-dnd').DragSource;

const dragOptionSource = {
  beginDrag(props) {
    return { name: props.name, type: props.type };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const DragOption = React.createClass({
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
        cursor: 'move'
      }}>
        {this.props.name}
      </div>
    );
  }
});

module.exports = DragSource(Draggable.DRAG_OPTION, dragOptionSource, collect)(DragOption);
