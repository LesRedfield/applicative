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

  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);
  },

  componentWillUnmount() {
    this.optionsListener.remove();
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

    return(
      <div className="segmentation group">
        <header className="seg-head group">
          <h1 id="seg-head-title">Segmentation</h1>
          <span id="seg-head-right">You are exploring Applicative on your own</span>
        </header>

        <div className='seg-body group'>
          <div className='seg-query-chart group'>
            <div className='seg-query-bar group'>
              <div className='query-events'>
                {
                  query.events.map( event => {
                    return (
                      <div>
                        {event}
                        <input id="remove" className="event-remove" type="submit" value="Remove" onClick={ this._handleRemoveEvent.bind(this, event) } />
                      </div>
                    );
                  })
                }
              </div>
              <div className='query-properties'>
                {
                  query.properties.map( property => {
                    return (
                      <div>
                        {property}
                        <input id="remove" className="property-remove" type="submit" value="Remove" onClick={ this._handleRemoveProperty.bind(this, property) } />
                      </div>
                    );
                  })
                }
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
