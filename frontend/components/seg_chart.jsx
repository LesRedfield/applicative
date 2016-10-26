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

    let loadingBlack = document.getElementById('loading-black');
    let loadingWhite = document.getElementById('loading-white');

    loadingBlack.style.display = 'flex';
    loadingWhite.style.display = 'flex';

    if (item.type == "Events") {
      OptionsStore.addEvent(item.name);
    } else if (item.type == "Properties") {
      OptionsStore.addProperty(item.name);
    }
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
    return({ options: OptionsStore.all().segmentation, isOver: false });
  },

  _optionsChanged() {
    this.setState({ options: OptionsStore.all().segmentation, isOver: false });
    let loadingBlack = document.getElementById('loading-black');
    let loadingWhite = document.getElementById('loading-white');

    loadingBlack.style.display = 'none';
    loadingWhite.style.display = 'none';
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver === true) {
      this.setState({ isOver: true });
    }
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);

    let loadingBlack = document.getElementById('loading-black');
    let loadingWhite = document.getElementById('loading-white');

    loadingBlack.style.display = 'none';
    loadingWhite.style.display = 'none';
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
            options={ this.state.options }
            />
          {isOver &&
            <div className="seg-by" style={{
              position: 'absolute',
              top: 50,
              left: 50,
              right: 50,
              bottom: 50,
              zIndex: 1,
              opacity: 1,
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

module.exports = DropTarget([Draggable.DRAG_OPTION], segChartTarget, collect)(SegChart);
