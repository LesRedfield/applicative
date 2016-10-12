const React = require('react');
const DragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend = require('react-dnd-html5-backend');

const OptionsStore = require('../stores/options_store');
const QueriesStore = require('../stores/queries_store');
const SessionStore = require('../stores/session_store');

const OptionsActions = require('../actions/options_actions');
const QueriesActions = require('../actions/queries_actions');
const SessionActions = require('../actions/session_actions');

const SegChart = require('./seg_chart');
const RightNav = require('./right_nav');
const SegQueryBar = require('./seg_query_bar');

const Segmentation = React.createClass({
  getInitialState(){
    return({ options: OptionsStore.all().segmentation, title: "Untitled" });

  },

  _optionsChanged() {
    this.setState({ options: OptionsStore.all().segmentation });
    this._addClickListener();
  },

  componentDidMount() {
    this.optionsListener = OptionsStore.addListener(this._optionsChanged);

    QueriesActions.fetchQueries(SessionStore.currentUser().id);
    // debugger
  },

  componentWillUnmount() {
    OptionsStore.removeAllOptions();

    this.optionsListener.remove();
  },

  _addClickListener() {

    if (this.state.options.plotOptions) {
      let newState = this.state.options;
      newState.plotOptions.series.point = {
        events: {
          click: function() {
            alert (this.category + ': ' + this.y);
          }
        }
      };

      this.setState({ options: newState });
    }
  },

  _titleInputHandler(e) {

    return (e) => this.setState({ title: e.target.value });

  },

  _handleRemoveEvent(event) {
    OptionsStore.removeEvent(event);

    OptionsActions.changeOptions(OptionsStore.all().segmentation.query);
  },

  _handleRemoveProperty(property) {
    OptionsStore.removeProperty(property);

    OptionsActions.changeOptions(OptionsStore.all().segmentation.query);
  },

  _updateTitle() {
    if (this.state.options.query) {
      this.setState({ title: this.state.options.query.title });

      OptionsStore.disableImport();
    }
  },

  _resetQueryBar() {
    // this.setState({ title: "Untitled" });

    OptionsActions.changeOptions({ events: [], properties: [], title: "Untitled" });
  },

  render(){

    let query = { events: [], properties: [], title: this.state.title };

    if (this.state.options.query) {
      query = this.state.options.query;
    }

    if (query.title !== this.state.title && OptionsStore.canImport()) {
      this._updateTitle();
    }


    let eventProperties = <div className="by">By</div>;
    if (query.properties.length > 0) {
      eventProperties = query.properties.map( (property, index) => {
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

              <SegQueryBar/>

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
