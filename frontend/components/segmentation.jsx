const React = require('react');
const DragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend = require('react-dnd-html5-backend');

const OptionsStore = require('../stores/options_store');
const OptionsActions = require('../actions/options_actions');

const SegChart = require('./seg_chart');
const RightNav = require('./right_nav');

const Segmentation = React.createClass({
  getInitialState(){
    return({options: OptionsStore.all().segmentation});
  },

  _optionsChanged() {
    this.setState({options: OptionsStore.all().segmentation});
    this._addClickListener();
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
  },

  componentWillUnmount() {
    this.optionsListener.remove();
  },

  _addClickListener() {

    if (this.state.options.plotOptions) {
      let newState = this.state.options;
      newState.plotOptions.series.point = {
        events: {
          click: function() {
            alert ('Here is where the annotations feature should be!' + this.category + ': ' + this.y);
            console.log(this);
          }
        }
      };

      this.setState({ options: newState });
    }
  },

  _handleRemoveEvent(event) {
    OptionsStore.removeEvent(event);

    OptionsActions.changeOptions(OptionsStore.all().segmentation.query);
  },

  _handleRemoveProperty(property) {
    OptionsStore.removeProperty(property);

    OptionsActions.changeOptions(OptionsStore.all().segmentation.query);
  },

  render(){
    let query = { events: [], properties: [] };

    if (this.state.options.query) {
      query = this.state.options.query;
    }

    let title = 'Untitled';

    let eventProperties = <div className="by">By</div>;
    if (query.properties.length > 0) {
      eventProperties = query.properties.map( property => {
        return (
          <div className="enclosing">
            <div className="by">
              By
            </div>
            <div className="seg-query-event-property">
              <span className="seg-query-event-property-icon"></span>
              {property}
              <div id="remove" className="property-remove" onClick={ this._handleRemoveProperty.bind(this, property) }></div>
            </div>
          </div>
        );
      });
    }

    return(
      <div className="segmentation group">
        <header className="seg-head group">
          <h1 id="seg-head-title">Segmentation</h1>
          <span id="seg-head-right">You are exploring Applicative on your own</span>
        </header>

        <div className='seg-body group'>
          <div className='seg-query-chart group'>
            <div className='seg-query-bar group'>

              <div className="query-header group">
                <span className="seg-query-icon"></span>
                <div className="seg-query-title">{title}</div>
                <div className="query-header-right group">
                  <div className="reset-icon"></div>
                  <div className="reset-text">RESET</div>
                </div>
              </div>

              <div className="seg-query-events group">
                {
                  query.events.map( event => {
                    return (
                      <div className="seg-query-event-line group">
                        <span className="seg-query-event">
                          <span className="seg-query-event-icon"></span>
                          {event}
                          <div id="remove" className="event-remove" onClick={ this._handleRemoveEvent.bind(this, event) }></div>
                        </span>
                        <div className="seg-query-event-properties">
                          {eventProperties}
                        </div>
                      </div>
                    );
                  })
                }

              </div>

              <div className="drop-an-event">

              </div>

            </div>
            <div className='seg-chart-outer'>
                <SegChart
                  options={this.state.options}
                />
            </div>
          </div>
          <div className="seg-options">
            <RightNav
              query={query}
            />
          </div>
        </div>

      </div>
    );
  }

});

module.exports = DragDropContext(HTML5Backend)(Segmentation);
