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
      // item.query.events.push(item.name);
      OptionsStore.addEvent(item.name);
    } else if (itemType == "PROPERTY") {
      // item.query.properties = [item.name];
      OptionsStore.addProperty(item.name);
    }

    // OptionsActions.changeOptions(item.query);
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

    if (this.state.options.chart) {
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
              top: 50,
              left: 50,
              right: 50,
              bottom: 50,
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: 'white',
              borderColor: '#2DA29D',
              borderWidth: '8px',
              borderStyle: 'dashed',
              color: '#2DA29D',
              fontSize: '50px',
              textAlign: 'center',
              fontWeight: 400,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>Segment By...</div>
          }
        </div>
      );
    } else {
      return connectDropTarget(
        <div className="seg-chart-inner">
          <div className="no-event">
            <div className="no-event-messages">
              <div className="top-text">
                Ask anything. Answer everything. Ad hoc data exploration at your fingertips.
              </div>
              <div className="no-event-pic"></div>
              <div className="bottom-text">
                Drag in an Event to start.
              </div>
            </div>
          </div>
          {isOver &&
            <div className="no-event-hover">
              <div className="no-event-messages">
                <div className="top-text">
                  Ask anything. Answer everything. Ad hoc data exploration at your fingertips.
                </div>
                <div className="no-event-pic-hover"></div>
                <div className="bottom-text-hover">
                  Drag in an Event to start.
                </div>
              </div>
            </div>
          }
        </div>
      );
    }

  }

});

module.exports = DropTarget([Draggable.EVENT, Draggable.PROPERTY], segChartTarget, collect)(SegChart);
