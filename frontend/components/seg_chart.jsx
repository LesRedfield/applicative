const React = require('react');
const PropTypes = React.PropTypes;
const Highchart = require('./highchart');
const Draggable = require('../constants/draggable_constants');
const DropTarget = require('react-dnd').DropTarget;

const OptionsStore = require('../stores/options_store');
const OptionsActions = require('../actions/options_actions');

const segChartTarget = {
  drop(props, monitor, component) {
    let item = monitor.getItem();
    let itemType = monitor.getItemType();

    if (itemType == "EVENT") {
      item.query.events.push(item.name);
    } else if (itemType == "PROPERTY") {
      item.query.properties.push(item.name);
    }

    OptionsActions.changeOptions(item.query);




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
            top: 100,
            left: 50,
            height: '50%',
            width: '50%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }

});

module.exports = DropTarget([Draggable.EVENT, Draggable.PROPERTY], segChartTarget, collect)(SegChart);
