const React = require('react');
const PropTypes = React.PropTypes;
const Highchart = require('./highchart');
const Draggable = require('../constants/draggable_constants');
const DropTarget = require('react-dnd').DropTarget;

const OptionsStore = require('../stores/options_store');
const OptionsActions = require('../actions/options_actions');

const chartTarget = {
  drop(props) {
    // OptionsActions.changeOptions(props);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const SegChart = React.createClass({

  getInitialState(){
    return({options: OptionsStore.all().segmentation});
  },

  _optionsChanged() {
    this.setState({options: OptionsStore.all().segmentation});
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
  },

  componentWillUnmount() {
    this.optionsListener.remove();
  },

  render(){
    const connectDropTarget = this.props.connectDropTarget;
    const isOver = this.props.isOver;

    return connectDropTarget(
      <div className="seg-chart-inner">
        <Highchart
          key="seg-chart"
          container="seg-chart"
          options={this.state.options}
        />
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }

});

module.exports = DropTarget(Draggable.EVENT, chartTarget, collect)(SegChart);
